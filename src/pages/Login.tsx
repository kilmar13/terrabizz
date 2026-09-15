import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Login() {
  const { session, login, loginWithEmail, signupWithEmail, resetPassword, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(location.state?.mode || 'login');
  
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(location.state?.message || '');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // We explicitly want users to see the login screen and not be auto-redirected,
  // especially when they are testing the login button. So there is no auto-redirect useEffect here.

  const handleGoogleLogin = async () => {
    setIsSending(true);
    setErrorMsg('');
    try {
      await login();
      navigate('/');
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Failed to sign in with Google.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (mode === 'login') {
        if (!email || !password) throw new Error('Please enter email and password.');
        await loginWithEmail(email, password);
        navigate('/');
      } else if (mode === 'signup') {
        if (!email || !password || !name || !phone) throw new Error('All fields are required.');
        if (password !== confirmPassword) throw new Error('Passwords do not match.');
        if (password.length < 6) throw new Error('Password should be at least 6 characters.');
        
        await signupWithEmail(email, password, name, phone);
        await logout(); // force logout so they have to verify their email (optional, but good for verification flow)
        setSuccessMsg('Account created successfully. Please check your email to verify.');
        setMode('login');
      } else if (mode === 'forgot') {
        if (!email) throw new Error('Please enter your email.');
        await resetPassword(email);
        setSuccessMsg('Password reset email sent. Check your inbox.');
        setMode('login');
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
         setErrorMsg('Incorrect email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
         setErrorMsg('This email is already registered.');
      } else if (err.code === 'auth/network-request-failed') {
         setErrorMsg('Network error. Unable to connect. Please try again.');
      } else {
         setErrorMsg(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-[440px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-20 mb-20 lg:my-auto">
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-slate-100">
          
          <div className="flex items-center gap-3 mb-8">
            <Logo className="w-10 h-10" />
            <h1 className="text-2xl font-black tracking-tight text-slate-800">Terrabiz</h1>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create an Account' : 'Reset Password'}
            </h2>
            <p className="text-slate-500 text-sm font-medium mb-6">
              {mode === 'login' 
                ? 'Sign in to your enterprise command center.' 
                : mode === 'signup' 
                ? 'Start managing your inventory and sales effortlessly.'
                : 'Enter your email to receive a password reset link.'}
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                {errorMsg}
              </div>
            )}
            
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-sm font-medium">
                {successMsg}
              </div>
            )}
              
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
               {(mode === 'signup') && (
                 <>
                   <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" disabled={isSending} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400" />
                   </div>
                   <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone Number" disabled={isSending} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400" />
                   </div>
                 </>
               )}
               
               <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" disabled={isSending} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400" />
               </div>

               {(mode === 'login' || mode === 'signup') && (
                 <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" disabled={isSending} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400" />
                 </div>
               )}

               {mode === 'signup' && (
                 <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" disabled={isSending} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400" />
                 </div>
               )}
               
               {mode === 'login' && (
                 <div className="flex justify-end">
                   <button type="button" onClick={() => setMode('forgot')} className="text-xs font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
                     Forgot Password?
                   </button>
                 </div>
               )}

               <button 
                 type="submit"
                 disabled={isSending}
                 className="w-full py-4 mt-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-black uppercase tracking-widest text-[11px] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
               >
                 {isSending ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'} <ArrowRight size={16} strokeWidth={2.5} />
               </button>
            </form>

            {mode !== 'forgot' && (
              <>
                <div className="flex items-center gap-4 my-6">
                  <div className="h-px bg-slate-200 flex-1" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>
                
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSending}
                  className="w-full py-4 bg-[#0F172A] hover:bg-slate-800 transition-colors text-white font-black uppercase tracking-widest text-[11px] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 disabled:opacity-50 mb-6"
                >
                  {isSending ? 'Authenticating...' : 'Google'}
                </button>
              </>
            )}
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest"
              >
                {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldCheck size={14} /> SECURED BY TERRABIZ ENTERPRISE
           </p>
        </div>
      </div>
    </div>
  );
}
