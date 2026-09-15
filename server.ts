import express from "express";
import path from "path";
// Vite is dynamically imported in dev mode so production doesn't crash if it's missing
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// In-memory store for OTPs (in production, use Redis or Database)
const otpStore = new Map<string, { otp: string, expiresAt: number, attempts: number }>();

// Configure transporter
async function getTransporter() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    console.log("No SMTP_USER configured. Using Ethereal Email for testing.");
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }
}

app.post("/api/auth/send-otp", async (req, res) => {
  const { email, newDevice, deviceInfo } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(email, { otp, expiresAt, attempts: 0 });

  try {
    const transporter = await getTransporter();
    
    let emailSubject = "Terrabiz Login Verification Code";
    let emailHtml = `
      <h3>Hello,</h3>
      <p>A login attempt was made on your Terrabiz account.</p>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>This code expires in 10 minutes.</p>
      <p>If you did not initiate this login, please ignore this email and change your password immediately.</p>
      <br />
      <p>Terrabiz Security Team</p>
    `;

    if (newDevice) {
      emailHtml += `
        <hr />
        <h4>New Device Login Detected</h4>
        <ul>
          <li><strong>Device:</strong> ${deviceInfo.device || 'Unknown'}</li>
          <li><strong>Browser:</strong> ${deviceInfo.browser || 'Unknown'}</li>
          <li><strong>Time:</strong> ${new Date().toUTCString()}</li>
        </ul>
        <p>If this wasn't you, secure your account immediately.</p>
      `;
    }

    const info = await transporter.sendMail({
      from: '"Terrabiz Security" <security@terrabiz.com>',
      to: email,
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Message sent: %s", info.messageId);
    if (!process.env.SMTP_USER) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send OTP email" });
  }
});

app.post("/api/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  
  const record = otpStore.get(email);
  if (!record) {
    return res.status(400).json({ error: "No OTP requested or expired" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ error: "OTP expired" });
  }

  if (record.attempts >= 5) {
    return res.status(429).json({ error: "Account locked for 15 minutes due to too many failed attempts.", locked: true });
  }

  if (record.otp !== otp) {
    record.attempts += 1;
    otpStore.set(email, record);
    return res.status(400).json({ error: "Incorrect OTP", attemptsRemaining: 5 - record.attempts });
  }

  // Success
  otpStore.delete(email);
  res.json({ success: true, token: "mock_jwt_token_" + Date.now() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
