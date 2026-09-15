import React, { useState, useMemo } from "react";
import {
  CheckCircle2,
  Search,
  Play,
  BookOpen,
  Clock,
  Check,
  Users,
  MessageCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { cn } from "../lib/utils";

// --- Types & Data ---

type Topic = {
  id: string; // The letter A-Z
  title: string;
  type: string; // 'OWNER GUIDE' | 'OPERATIONAL GUIDE'
  content: React.ReactNode;
};

const TOPICS: Topic[] = [
  {
    id: "A",
    title: "Account Onboarding & Initial Setup",
    type: "OWNER GUIDE",
    content: (
      <>
        <p className="text-slate-600 mb-6">
          Launching your customized digital commerce console takes under two
          minutes. Onboarding configures the absolute identity of your business
          across billing, receipts, and invoices.
        </p>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">
                Complete Onboarding Wizard
              </h4>
              <p className="text-sm text-slate-500">
                Upon registration, input your accurate Business Name, active
                telephone lines, primary branch location, and primary currency
                denomination. This generates your workspace schema context
                instantly.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">
                Modify Store Meta Fields
              </h4>
              <p className="text-sm text-slate-500">
                Go to Settings &gt; Business Profile to update physical retail
                addresses, phone indices, and VAT/tax defaults. These are saved
                to your firestore records and load in every session.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "B",
    title: "Branding & Logo Customization",
    type: "OWNER GUIDE",
    content: (
      <>
        <p className="text-slate-600 mb-6">
          Your brand is the soul of your distributions. Uploading customized
          icons creates a pristine customer experience across receipts, online
          storefront assets, and PDFs.
        </p>
        <div className="bg-emerald-50/50 rounded-xl p-5 mb-6 border border-emerald-100">
          <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            Multi-Channel Media Sync
          </h4>
          <p className="text-sm text-emerald-700">
            Uploading your high-definition logo updates multiple screens
            simultaneously: POS thermal layout header, public e-commerce header,
            shareable PDF invoices, and automated client alerts.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "C",
    title: "Categories & Catalog Structure",
    type: "OPERATIONAL GUIDE",
    content: (
      <>
        <p className="text-slate-600 mb-6">
          A clean, structured inventory makes checking out twice as fast.
          Categories group products rationally for cashier terminal speed and
          unified reporting analytics.
        </p>
        <h4 className="font-bold text-slate-800 mb-2">Category Setup</h4>
        <p className="text-sm text-slate-500 mb-4">
          Navigate to Inventory &gt; Categories. Click "Add Category" and choose
          highly specific titles (e.g., "Beverages", "Grains", "Cosmetics")
          instead of wide tags. This helps filter POS products in seconds.
        </p>
      </>
    ),
  },
  {
    id: "D",
    title: "Dashboard Analytics & Live Metrics",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        Our live dashboard details key operational trends instantly, presenting
        crucial indicators of your store's commercial momentum.
      </p>
    ),
  },
  {
    id: "E",
    title: "Expense Bookkeeper & Cost Logger",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        True profit requires accounting for overheads. Every naira or cent spent
        on transport, light bills, fuel, or rent must be captured as it happens.
      </p>
    ),
  },
  {
    id: "F",
    title: "Financial Reports & Profit Forecast",
    type: "OWNER GUIDE",
    content: (
      <p className="text-slate-600">
        The Reports page houses comprehensive data streams to power strategic
        business choices. These tools reveal product velocities, active gross
        sales, and reorder alerts.
      </p>
    ),
  },
  {
    id: "G",
    title: "Group Visual Product Scanner",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        When wholesalers are handling chaotic piles of goods at checkout,
        manually searching each SKU is incredibly slow. The Scan Bunch tool uses
        specialized computer vision to inspect checkout counter arrangements
        instantly.
      </p>
    ),
  },
  {
    id: "H",
    title: "Handwritten Note Scanner",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        Customers frequently walk in holding paper lists, or WhatsApp scribbles
        of their order requests. Our Handwritten Order Note Digitizer transforms
        rough scribbles directly into checkout line-items with absolute
        precision.
      </p>
    ),
  },
  {
    id: "I",
    title: "Inventory: How To Add & Edit Products",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        Accurate product entries are the anchor of Terrabiz's profit calculations.
        To list and track your stock items correctly, complete this process.
      </p>
    ),
  },
  {
    id: "J",
    title: "Keyboard POS Shortcuts & Quick Calculator",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        Every microsecond counts when long checkout lines queue up. Cashiers can
        complete entire order entries completely hands-free using simple
        keyboard shortcuts.
      </p>
    ),
  },
  {
    id: "L",
    title: "Loss Prevention & Activity Audit History",
    type: "OWNER GUIDE",
    content: (
      <p className="text-slate-600">
        Secure operational audit trails protect store profits. The system
        monitors and logs major activities with exact timestamps, user names,
        and assigned stores.
      </p>
    ),
  },
  {
    id: "M",
    title: "Multi-Store Branch Control",
    type: "OWNER GUIDE",
    content: (
      <p className="text-slate-600">
        Our unified platform allows owners to oversee several branches securely.
        Swap viewpoints in a single click using the store selector at the top
        headers.
      </p>
    ),
  },
  {
    id: "P",
    title: "POS Terminal Cashier Terminal",
    type: "OPERATIONAL GUIDE",
    content: (
      <>
        <p className="text-slate-600 mb-6">
          The cornerstone of store sales. The POS screen supports high-velocity
          product entries, barcode cameras, client tagging, and split payments
          effortlessly.
        </p>
        <h4 className="font-bold text-slate-800 mb-4">
          Typical POS Action Flow:
        </h4>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-600 font-medium">
          <li>Simply tap items to populate the right billing panel.</li>
          <li>
            Double-tap quantity counts to modify wholesale counts on demand.
          </li>
          <li>
            <strong>Select Payment Mode:</strong> chooses between Cash, POS
            Card, Bank Transfer, Split-Pay, or Debt Charge (Credit).
          </li>
          <li>
            <strong>Finalize order.</strong> Instantly decreases real-time
            inventories, pushes logging events, and prompts paper receipt
            generation.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "R",
    title: "Reconciliation & Shift Close Balances",
    type: "OPERATIONAL GUIDE",
    content: (
      <>
        <p className="text-slate-600 mb-6">
          Never go home without verifying the register balances. Our{" "}
          <strong>Close Shop</strong> reconciliation ensures actual drawer cash
          corresponds perfectly with system histories.
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm mb-1">
              1. Count Register:
            </h4>
            <p className="text-[13px] text-slate-500">
              Physically count paper Cash in register drawers at sunset and
              aggregate Bank Transfers.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm mb-1">
              2. Cash Entry:
            </h4>
            <p className="text-[13px] text-slate-500">
              Turn on sidebar "Close Shop" dialog. Key down physical counts. The
              system flags discrepancies instantly.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "S",
    title: "Storefront URL & E-Commerce Orders",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        Extend your counter into cyberspace. Your Storefront URL displays
        real-time catalogs to remote buyers so they can browse, compile carts,
        and submit orders.
      </p>
    ),
  },
  {
    id: "T",
    title: "Team Staff Permissions & Security PINs",
    type: "OWNER GUIDE",
    content: (
      <p className="text-slate-600">
        Maintain tight organizational boundaries while delegating workloads.
        Control supervisor elevations and track login clearances under a secure
        team portal.
      </p>
    ),
  },
  {
    id: "U",
    title: "Upgrades, Payments & Billing Packages",
    type: "OWNER GUIDE",
    content: (
      <p className="text-slate-600">
        Scale up as your operations expand. Our packages unlock larger store
        branch capacities, multiple staff seats, advanced forecasting modules,
        and AI Wholesaler Suites.
      </p>
    ),
  },
  {
    id: "V",
    title: "Voice Commands & AI Vocal Cashier POS",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        Our advanced vocal POS processes complex English cashier commands
        instantly, allowing hands-free checkout. Simply speak to execute billing
        updates on the fly.
      </p>
    ),
  },
  {
    id: "W",
    title: "WhatsApp Reminders & Credit Debtors Ledger",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        Wholesale businesses run on credit options. The Debtors workbook
        tracking ledger details all outstanding merchant balances and processes
        direct customer paydowns.
      </p>
    ),
  },
  {
    id: "Y",
    title: "Wholesale Suppliers & Auto-Restock Ledgers",
    type: "OPERATIONAL GUIDE",
    content: (
      <p className="text-slate-600">
        Establish consistent raw materials pipelines. The Suppliers ledger
        tracks vendor invoices, pending procurement balances, and historic
        shipping batches in one combined workspace.
      </p>
    ),
  },
];

export default function Tutorial() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string>(TOPICS[0].id);
  const [masteredTopics, setMasteredTopics] = useState<Set<string>>(new Set());

  const filteredTopics = useMemo(() => {
    return TOPICS.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const activeTopicData = TOPICS.find((t) => t.id === activeTopic);
  const progressPercent = Math.round(
    (masteredTopics.size / TOPICS.length) * 100,
  );

  const toggleMastered = (id: string) => {
    const next = new Set(masteredTopics);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setMasteredTopics(next);
  };

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=2347039942882", "_blank");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 min-h-screen pb-20">
      {/* Top Hero Banner */}
      <div className="px-8 pt-8">
        <div className="bg-[#0F172A] rounded-[32px] p-10 lg:p-12 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase rounded-full tracking-widest mb-6">
              USER ACADEMY 2026
              <span className="flex gap-0.5 ml-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              </span>
            </div>

            <h1 className="text-5xl lg:text-[64px] font-black text-white tracking-tight leading-none mb-4">
              A-Z Complete <br />
              <span className="text-[#10B981]">User Guide.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg max-w-xl">
              Your comprehensive dictionary for mastering every tool in the
              Terrabiz ecosystem.
            </p>
          </div>

          <div className="w-full lg:w-[400px] shrink-0">
            <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                YOUR PROGRESS
              </span>
              <span className="text-3xl font-black text-[#10B981]">
                {progressPercent}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[#10B981] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span>{masteredTopics.size} MASTERED</span>
              <span>{TOPICS.length} TOTAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Nav Cards */}
      <div className="px-8 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setActiveTopic("P")}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Play size={20} strokeWidth={2} className="ml-1" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 tracking-tight">
              Quick Sell
            </h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Go to section P
            </p>
          </div>
        </div>

        <div
          onClick={() => setActiveTopic("C")}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <BookOpen size={20} strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 tracking-tight leading-tight">
              Inventory <br /> Management
            </h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              Go to section C
            </p>
          </div>
        </div>

        <div
          onClick={() => setActiveTopic("R")}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Clock size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 tracking-tight">
              Daily Closing
            </h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Go to section R
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="px-8 mt-10 flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Nav */}
        <div className="w-full lg:w-[320px] shrink-0 sticky top-4 max-h-[calc(100vh-2rem)] flex flex-col">
          {/* Search Box */}
          <div className="relative mb-4">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
              strokeWidth={2.5}
            />
            <input
              type="text"
              placeholder="Search content (e.g. Sales)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-slate-800 shadow-sm"
            />
          </div>

          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 max-h-[600px]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                TUTORIAL INDEX
              </span>
            </div>

            <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
              {filteredTopics.map((topic) => {
                const isActive = activeTopic === topic.id;
                const isMastered = masteredTopics.has(topic.id);

                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors mb-1 group relative",
                      isActive ? "bg-slate-900" : "hover:bg-slate-50",
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center font-black text-[13px] shrink-0",
                        isActive
                          ? "bg-white text-slate-900"
                          : isMastered
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200",
                      )}
                    >
                      {isMastered && !isActive ? (
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        topic.id
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-bold truncate pr-6",
                        isActive ? "text-white" : "text-slate-600",
                      )}
                    >
                      {topic.title}
                    </span>

                    {isMastered && isActive && (
                      <Check
                        size={14}
                        strokeWidth={3}
                        className="text-[#10B981] absolute right-4"
                      />
                    )}
                  </button>
                );
              })}
              {filteredTopics.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-sm font-medium">
                  No tutorials match your search.
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-center shrink-0">
              <ChevronDown
                size={20}
                className="text-slate-300 animate-bounce"
              />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {activeTopicData && (
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-10 lg:p-14 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                    <BookOpen size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-black text-[#10B981]">
                        {activeTopicData.type}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                        Topic {activeTopicData.id}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                      {activeTopicData.title}
                    </h2>
                  </div>
                </div>

                {/* Mark as read button */}
                <button
                  onClick={() => toggleMastered(activeTopicData.id)}
                  className={cn(
                    "shrink-0 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm border",
                    masteredTopics.has(activeTopicData.id)
                      ? "bg-emerald-50 text-[#10B981] border-emerald-200"
                      : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50",
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                      masteredTopics.has(activeTopicData.id)
                        ? "border-[#10B981] bg-[#10B981]"
                        : "border-slate-300",
                    )}
                  >
                    {masteredTopics.has(activeTopicData.id) && (
                      <Check size={10} strokeWidth={4} className="text-white" />
                    )}
                  </div>
                  {masteredTopics.has(activeTopicData.id)
                    ? "MASTERED"
                    : "MARK AS READ"}
                </button>
              </div>

              {/* Dynamic Content injected here */}
              <div className="prose prose-slate prose-img:rounded-xl max-w-none">
                {activeTopicData.content}
              </div>

              {/* Bottom Scroll/Progress Indicator */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 italic">
                  Mastering this section earns you{" "}
                  {Math.round(100 / TOPICS.length)}% total progress.
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                  SCROLL DOWN FOR MORE{" "}
                  <ChevronDown size={14} className="mt-0.5" />
                </span>
              </div>
            </div>
          )}

          {/* Help CTA Box */}
          <div className="bg-[#10B981] rounded-[32px] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0 shadow-inner">
                <Users size={28} strokeWidth={1.5} className="text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-2xl lg:text-3xl font-black tracking-tight mb-2">
                  STILL NEED A PERSON?
                </h3>
                <p className="font-medium text-emerald-50 text-sm max-w-sm leading-relaxed">
                  Our "Master Onboarding" team is available for 1-on-1 calls to
                  help you migrate your legacy records.
                </p>
              </div>
            </div>

            <button
              onClick={openWhatsApp}
              className="w-full md:w-auto px-10 py-5 bg-white text-[#10B981] hover:bg-emerald-50 transition-colors font-black uppercase tracking-widest text-[13px] rounded-2xl shadow-lg relative z-10 flex items-center justify-center"
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
