import React, { useState } from 'react';
import { Send, Users, Mail, ArrowRight, AlertTriangle, Users2, Shield, Settings2, Trash2, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import StaffInvitationModal from '../components/StaffInvitationModal';
import RoleManagementModal from '../components/RoleManagementModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function Team() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const [staffList, setStaffList] = useState<any[]>([]);

  const handleRoles = (staff: any) => {
    setSelectedStaff(staff);
    setIsRoleModalOpen(true);
  };


  const handleDelete = (staff: any) => {
    setSelectedStaff(staff);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStaff) {
      setStaffList(staffList.filter(s => s.id !== selectedStaff.id));
    }
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter uppercase italic">
            TEAM MANAGEMENT
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest bg-slate-100 inline-block px-3 py-1 rounded-lg mt-2">
            MANAGE STAFF ACCESS AND ROLES
          </p>
        </div>
        
        <div className="flex gap-4 items-center flex-wrap">
           <div className="px-4 py-3 bg-white border-2 border-[#10B981] rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-100/50">
             <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse"></div>
             <span className="text-sm font-black text-[#0F172A] uppercase tracking-widest">
               {staffList.length} ACTIVE OPERATORS
             </span>
           </div>
        </div>
      </header>

      {/* Invite New Staff Card */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border-4 border-emerald-50 shadow-xl shadow-emerald-100/50 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-[#10B981] text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Send size={28} className="ml-1" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0F172A] italic uppercase tracking-tight">
              INVITE NEW STAFF
            </h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
              EMAIL-INDEXED BUSINESS LINKING
            </p>
          </div>
        </div>

        <form className="flex flex-col lg:flex-row gap-6 items-end">
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
              STAFF EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                placeholder="staff@business.co" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all"
              />
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
              ASSIGN ROLE
            </label>
            <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all appearance-none cursor-pointer">
              <option value="CASHIER">CASHIER (Terminal only)</option>
              <option value="MANAGER">MANAGER (Inventory Admin)</option>
              <option value="ADMIN">ADMIN (Full Access)</option>
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
              ASSIGN STORE
            </label>
            <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all appearance-none cursor-pointer">
              <option value="Central Store">Central Store</option>
              <option value="Mainland Branch">Mainland Branch</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full lg:w-auto px-8 py-4 bg-[#10B981] text-white rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/30 hover:bg-[#059669] transition-colors shrink-0"
          >
            SEND INVITE <ArrowRight size={18} strokeWidth={3} />
          </button>
        </form>
      </div>

      {/* Team Roster Card */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border-4 border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-emerald-50 text-[#10B981] rounded-[20px] flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0F172A] italic uppercase tracking-tight">
              TEAM ROSTER
            </h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
              ACTIVE PERSONNEL ON YOUR BUSINESS ID
            </p>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-[#0F172A] text-white">
                <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest rounded-tl-xl text-left">
                  OPERATOR
                </th>
                <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-center border-l border-slate-700">
                  STATION
                </th>
                <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-center border-l border-slate-700">
                  CLASSIFICATION
                </th>
                <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-center rounded-tr-xl border-l border-slate-700">
                  OPERATION
                </th>
              </tr>
            </thead>
            <tbody>
              {staffList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center">
                        <Users2 size={40} className="text-slate-300" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-black text-slate-400 uppercase tracking-widest">
                          NO OPERATORS DEPLOYED
                        </h4>
                        <p className="text-[10px] text-slate-400/80 font-bold uppercase tracking-widest">
                          ADD MEMBERS USING THE FORM ABOVE
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                staffList.map((staff, idx) => (
                  <tr key={staff.id} className={cn("hover:bg-slate-50 transition-colors", idx !== staffList.length - 1 && "border-b border-slate-100")}>
                     <td className="px-6 py-4">
                       <p className="font-black text-slate-800 text-sm">{staff.name}</p>
                       <p className="font-bold text-slate-400 text-xs">{staff.email}</p>
                     </td>
                     <td className="px-6 py-4 text-center font-bold text-slate-600 text-xs tracking-wide">
                       {staff.branch}
                     </td>
                     <td className="px-6 py-4 text-center">
                       <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${
                         staff.role === 'Admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                         staff.role === 'Manager' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                         'bg-emerald-50 text-emerald-600 border-emerald-100'
                       }`}>
                         {staff.role}
                       </span>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex items-center justify-center gap-2">
                         <button onClick={() => alert("Staff suspended!")} className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-100 transition-colors" title="Suspend Staff">
                            <Shield size={16} />
                         </button>
                         <button onClick={() => handleRoles(staff)} className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors" title="Manage Roles">
                            <Settings2 size={16} />
                         </button>
                         <button onClick={() => handleDelete(staff)} className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-colors" title="Remove Staff">
                            <Trash2 size={16} />
                         </button>
                       </div>
                     </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <StaffInvitationModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <RoleManagementModal 
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        staff={selectedStaff}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Revoke Staff Access"
        message={`Are you sure you want to remove ${selectedStaff?.name} from your team? They will lose all access immediately.`}
      />
    </div>
  );
}
