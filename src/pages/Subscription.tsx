import React, { useState } from "react";
import {
  CheckCircle2,
  X,
  ArrowRight,
  Zap,
  Star,
  ShieldCheck,
  Check,
  Phone,
} from "lucide-react";
import { cn } from "../lib/utils";
import { ExternalLink } from "lucide-react";

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "biannual">(
    "annual",
  );

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=2347039942882", "_blank");
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center pt-8 pb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-100 tracking-wider mb-6">
          <Zap size={12} className="fill-emerald-600" />
          FLEXIBLE BILLING OPTIONS
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-800 tracking-tight text-center leading-tight">
          Scalable Pricing for <br />
          <span className="text-[#10B981]">Modern Commerce.</span>
        </h1>

        <p className="text-slate-500 font-medium mt-6 text-center text-lg max-w-xl">
          From micro-stores to enterprise-level distribution.{" "}
          <br className="hidden sm:block" />
          Choose a plan that matches your business velocity.
        </p>

        {/* Billing Toggle */}
        <div className="mt-10 flex flex-col items-center">
          <div className="flex bg-slate-100 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            <button
              onClick={() => setBillingCycle("biannual")}
              className={cn(
                "px-8 py-3 text-sm font-black rounded-full transition-all uppercase tracking-widest",
                billingCycle === "biannual"
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              BI-ANNUAL
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-8 py-3 text-sm font-black rounded-full transition-all uppercase tracking-widest",
                billingCycle === "annual"
                  ? "bg-slate-900 shadow-xl text-white"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              ANNUAL
            </button>
          </div>
          <p className="text-[10px] font-bold text-[#10B981] mt-4 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            SAVE UP TO 30% WITH ANNUAL
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-6">
        {/* Free Plan */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col relative shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-6">
            <Zap size={24} strokeWidth={1.5} className="text-slate-400" />
          </div>

          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
            Free
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-800 tracking-tighter">
              ₦0
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Forever
            </span>
          </div>

          <p className="text-sm font-medium text-slate-500 mt-6 min-h-[60px]">
            Perfect for micro-retailers testing the digital waters. Manage your
            core inventory and record daily sales with ease.
          </p>

          <div className="mt-8 space-y-4 flex-1">
            {[
              "Max 5 Products",
              "1 Store Location",
              "Manual Sales Recording",
              "Basic Today's Profit/Loss",
              "Community/Email Support",
              "Basic PDF Receipt Generation",
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check
                  size={18}
                  strokeWidth={3}
                  className="text-slate-800 shrink-0 mt-0.5"
                />
                <span className="text-[13px] font-bold text-slate-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-5 bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[11px] rounded-2xl border border-slate-200 cursor-default">
            CURRENT PLAN
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-3xl border-2 border-[#10B981] p-8 flex flex-col relative shadow-xl shadow-emerald-500/10 scale-[1.02] z-10">
          <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
            <span className="bg-[#10B981] text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
              MOST POPULAR
            </span>
          </div>

          <div className="w-12 h-12 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center mb-6">
            <Star
              size={24}
              strokeWidth={2}
              className="text-[#10B981] fill-emerald-100"
            />
          </div>

          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
            Pro
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-800 tracking-tighter">
              ₦{billingCycle === "annual" ? "35,000" : "20,000"}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              /{billingCycle === "annual" ? " year" : " 6 months"}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-500 mt-6 min-h-[60px]">
            Built for scaling businesses that need advanced tracking, automated
            insights, and multi-location coordination.
          </p>

          <div className="mt-8 space-y-4 flex-1">
            {[
              "Unlimited Products",
              "CSV Bulk Template Upload & Import",
              "Up to 2 Store Locations",
              "Full Customer & Supplier Debt Tracking",
              "Automated End-of-Day Business Summary",
              "Ugu-Bot AI Assistant (Basic Analysis)",
              "365-day Transaction History",
              "1 Additional Staff Login (Shared)",
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check
                  Circle2
                  size={18}
                  strokeWidth={2.5}
                  className="text-[#10B981] shrink-0 mt-0.5"
                />
                <span className="text-[13px] font-bold text-slate-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-5 bg-[#10B981] hover:bg-emerald-600 transition-colors text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
            UPGRADE TO PRO <ArrowRight size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-[#0F172A] rounded-3xl border border-slate-700 p-8 flex flex-col relative shadow-xl">
          <div className="absolute top-0 right-8 -translate-y-1/2">
            <span className="bg-amber-400 text-slate-900 border-2 border-[#0F172A] px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
              DIAMOND STATUS
            </span>
          </div>

          <div className="w-12 h-12 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center mb-6">
            <ShieldCheck size={24} strokeWidth={1.5} className="text-white" />
          </div>

          <h3 className="text-2xl font-black text-white tracking-tight">
            Enterprise
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-white tracking-tighter">
              ₦{billingCycle === "annual" ? "50,000" : "30,000"}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              /{billingCycle === "annual" ? " year" : " 6 months"}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-400 mt-6 min-h-[60px]">
            The complete command center for complex distributions and fast-paced
            wholesaling. Advanced security, mapping, and AI automation.
          </p>

          <div className="mt-8 space-y-4 flex-1">
            {[
              "Voice Cashier POS (Speech-to-Cart Commands)",
              "Handwritten Order Digitizer (A Notepad Scan)",
              "Visual Group Scanner (Scan Bunch / Cohort at POS)",
              "CSV Bulk Upload (Auto-Mapping & Bulk Import)",
              "Up to 5 Store Locations",
              "Advanced Liquidity & Cash Flow Forecasting",
              "Multi-User Access with Role-Based Permissions",
              "Low-Stock AI Alerts & Reorder Suggestions",
              "Custom Branded Invoices with Logo and Identity",
              "Priority WhatsApp Support (Direct VIP Support Line)",
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} strokeWidth={4} />
                </div>
                <span className="text-[13px] font-bold text-slate-200">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-5 bg-amber-400 hover:bg-amber-500 transition-colors text-slate-900 font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2">
            GO ENTERPRISE <ArrowRight size={16} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Technical Comparison Heading */}
      <div className="mt-32 mb-16 text-center">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
          TECHNICAL COMPARISON
        </h2>
        <p className="text-slate-500 font-medium mt-2">
          Detailed breakdown of operational capabilities.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-6 px-8 bg-white border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[30%]">
                  FEATURE CAPABILITY
                </th>
                <th className="py-6 px-8 bg-slate-50 border-b border-l border-slate-100 text-[10px] font-black text-slate-600 uppercase tracking-widest w-[23%] text-center">
                  STARTER
                </th>
                <th className="py-6 px-8 bg-emerald-50/50 border-b border-l-2 border-r-2 border-emerald-500 text-[10px] font-black text-emerald-600 uppercase tracking-widest w-[23%] text-center">
                  PRO ENGINE
                </th>
                <th className="py-6 px-8 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest w-[24%] text-center">
                  POWERHOUSE
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                {
                  name: "Inventory Limits",
                  free: "5 PRODUCTS",
                  pro: "UNLIMITED",
                  ent: "UNLIMITED",
                  proColor: "text-[#10B981]",
                },
                {
                  name: "Store Locations",
                  free: "1 STORE",
                  pro: "2 STORES",
                  ent: "5 STORES",
                  proColor: "text-slate-800",
                },
                {
                  name: "Sales Management",
                  free: "MANUAL",
                  pro: "AUTOMATED SYNC",
                  ent: "ADVANCED MAPPING",
                  proColor: "text-[#10B981]",
                },
                {
                  name: "Staff Access",
                  free: "OWNER ONLY",
                  pro: "1 STAFF (SHARED)",
                  ent: "MULTI-USER ROLES",
                  proColor: "text-slate-800",
                },
                {
                  name: "AI: Voice Cashier Commands",
                  free: false,
                  pro: false,
                  ent: true,
                },
                {
                  name: "AI: Handwritten Order Digitizer",
                  free: false,
                  pro: false,
                  ent: true,
                },
                {
                  name: "AI: Visual Product Bunch Scanner",
                  free: false,
                  pro: false,
                  ent: true,
                },
                {
                  name: "AI: Low-Stock Alerts & Forecast",
                  free: false,
                  pro: false,
                  ent: true,
                },
                {
                  name: "Reporting & Custom Branded PDF",
                  free: "BASIC PDF",
                  pro: "END-OF-DAY EMAIL",
                  ent: "CUSTOM INVOICING",
                  proColor: "text-[#10B981]",
                },
                {
                  name: "History Tracking",
                  free: "LIMITED",
                  pro: "365 DAYS",
                  ent: "LIFETIME",
                  proColor: "text-[#10B981]",
                },
                {
                  name: "CSV Bulk Upload & AutoMap",
                  free: false,
                  pro: true,
                  ent: true,
                },
                {
                  name: "Priority Support Channel",
                  free: false,
                  pro: "EMAIL ONLY",
                  ent: "WHATSAPP DIRECT",
                  entColor: "text-amber-600",
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-5 px-8 font-bold text-slate-800">
                    {row.name}
                  </td>

                  {/* Starter Column */}
                  <td className="py-5 px-8 border-l border-slate-100 text-center font-bold text-slate-500 text-[11px] uppercase tracking-wider">
                    {row.free === false ? (
                      <X
                        size={16}
                        strokeWidth={2.5}
                        className="mx-auto text-slate-300"
                      />
                    ) : row.free === true ? (
                      <Check
                        size={18}
                        strokeWidth={3}
                        className="mx-auto text-slate-400"
                      />
                    ) : (
                      row.free
                    )}
                  </td>

                  {/* Pro Column */}
                  <td className="py-5 px-8 border-l-2 border-r-2 border-emerald-50 bg-emerald-50/10 text-center font-black text-[11px] uppercase tracking-wider">
                    {row.pro === false ? (
                      <X
                        size={16}
                        strokeWidth={2.5}
                        className="mx-auto text-slate-300"
                      />
                    ) : row.pro === true ? (
                      <Check
                        size={18}
                        strokeWidth={3}
                        className="mx-auto text-[#10B981]"
                      />
                    ) : (
                      <span className={row.proColor || "text-slate-800"}>
                        {row.pro}
                      </span>
                    )}
                  </td>

                  {/* Enterprise Column */}
                  <td className="py-5 px-8 border-l border-slate-100 text-center font-black text-[11px] uppercase tracking-wider text-slate-700">
                    {row.ent === false ? (
                      <X
                        size={16}
                        strokeWidth={2.5}
                        className="mx-auto text-slate-300"
                      />
                    ) : row.ent === true ? (
                      <Check
                        size={18}
                        strokeWidth={3}
                        className="mx-auto text-amber-500"
                      />
                    ) : (
                      <span className={row.entColor || "text-slate-700"}>
                        {row.ent}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-8 bg-[#0F172A] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 text-slate-300 text-[9px] font-black uppercase rounded-full border border-slate-700 tracking-widest mb-4">
            <Phone size={12} className="fill-slate-500" />
            ENTERPRISE DIRECT LINE
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">
            Complex Operations? <br />
            <span className="text-amber-400">Let\'s Build Custom.</span>
          </h2>
          <p className="text-slate-400 font-medium max-w-lg">
            We provide tailored setups for large warehouses, franchisee systems,
            and multi-national logistics.
          </p>
        </div>

        <button
          onClick={openWhatsApp}
          className="shrink-0 px-8 py-5 bg-[#10B981] hover:bg-emerald-600 transition-colors text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center gap-2"
        >
          Message Consultant <ArrowRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
