"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Clock, DollarSign, Users, ShieldCheck, AlertTriangle, ArrowLeft, Lock, Mail, Phone, Calendar, Tag as TagIcon, CreditCard, ChevronRight } from "lucide-react";
import { useGetLead, useContactLead } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";

const NAVY = "#0F3D66";

export default function LeadDetailClient() {
  const params = useParams<{ id: string }>();
  const leadId = parseInt(params.id || "0", 10);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockedContact, setUnlockedContact] = useState<{ clientName: string; clientEmail: string; clientPhone?: string | null } | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const { data: lead, isLoading, isError } = useGetLead(leadId);

  const { mutate: unlockContact } = useContactLead({
    mutation: {
      onSuccess: (data) => {
        setIsUnlocking(false);
        setUnlockedContact(data);
        setToastMsg(`Contact unlocked! You can now reach ${data.clientName}.`);
        setTimeout(() => setToastMsg(null), 4000);
      },
      onError: () => {
        setIsUnlocking(false);
        setToastMsg("Failed to unlock contact. Please try again.");
        setTimeout(() => setToastMsg(null), 4000);
      },
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl animate-pulse space-y-8">
        <div className="h-6 w-28 bg-gray-200 rounded" />
        <div className="h-12 w-3/4 bg-gray-200 rounded" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 h-56 bg-gray-200 rounded-lg" />
          <div className="h-80 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <AlertTriangle size={56} className="mx-auto text-gray-300 mb-5" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Lead Not Found</h2>
        <p className="text-gray-500 mb-7 max-w-md mx-auto">This project may have been removed or the URL is incorrect.</p>
        <Link href="/leads">
          <button className="px-7 py-3 rounded text-sm font-semibold text-white" style={{ backgroundColor: NAVY }}>
            Return to Leads
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {toastMsg && (
        <div className="fixed bottom-6 right-6 text-white px-5 py-4 rounded-lg shadow-2xl z-50 max-w-sm text-sm" style={{ backgroundColor: NAVY }}>
          {toastMsg}
        </div>
      )}

      <div className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/leads" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-5">
            <ArrowLeft size={15} className="mr-1.5" /> Back to Search Results
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: NAVY }}
            >
              {lead.category}
            </span>
            {lead.isUrgent && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                <AlertTriangle size={12} /> Urgent
              </span>
            )}
            {lead.isVerified && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <ShieldCheck size={12} /> Verified
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {lead.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-1.5"><MapPin size={15} className="text-gray-400" />{lead.city}, {lead.state}</div>
            <div className="flex items-center gap-1.5"><Clock size={15} className="text-gray-400" />Posted {formatDistanceToNow(new Date(lead.postedAt))} ago</div>
            <div className="flex items-center gap-1.5"><Users size={15} className="text-gray-400" />{lead.interestedCount} Contractors Interested</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Description</h2>
              <p className="whitespace-pre-wrap text-gray-600 leading-relaxed text-sm">{lead.description}</p>
            </section>
            {lead.tags && lead.tags.length > 0 && (
              <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Tags & Requirements</h2>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                      <TagIcon size={12} className="text-gray-400" />{tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="md:col-span-1 space-y-5">
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden sticky top-24">
              <div className="p-5 text-white text-center" style={{ backgroundColor: NAVY }}>
                <p className="text-blue-200 text-xs font-medium mb-1 uppercase tracking-wider">Estimated Budget</p>
                <div className="text-2xl font-bold">
                  {formatCurrency(lead.budgetMin)} <span className="text-blue-300 font-normal text-xl mx-0.5">–</span> {formatCurrency(lead.budgetMax)}
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center" style={{ color: NAVY }}><Calendar size={16} /></div>
                      Timeline
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{lead.timeline}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600"><ShieldCheck size={16} /></div>
                      Lead Quality
                    </div>
                    <span className="font-bold text-green-700 text-sm">{lead.isVerified ? "High (Verified)" : "Standard"}</span>
                  </div>
                </div>

                {unlockedContact ? (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-5">
                    <h3 className="font-bold text-green-900 mb-3 flex items-center gap-1.5 text-sm"><ShieldCheck size={16} /> Contact Unlocked</h3>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-2.5 text-gray-700"><Users size={14} className="text-gray-400" /><span className="font-medium">{unlockedContact.clientName}</span></div>
                      <div className="flex items-center gap-2.5 text-gray-700"><Mail size={14} className="text-gray-400" /><span>{unlockedContact.clientEmail}</span></div>
                      {unlockedContact.clientPhone && <div className="flex items-center gap-2.5 text-gray-700"><Phone size={14} className="text-gray-400" /><span>{unlockedContact.clientPhone}</span></div>}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-5">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Client Details</h3>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-2.5 text-gray-600">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center"><Users size={13} /></div>
                        <span className="font-medium text-gray-900">{lead.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-gray-400">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"><Phone size={13} /></div>
                        <span className="blur-sm select-none">(555) 123-XXXX</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-gray-400">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"><Mail size={13} /></div>
                        <span className="blur-sm select-none">client@example.com</span>
                      </div>
                    </div>
                  </div>
                )}

                {!unlockedContact && (
                  <button
                    className="w-full h-12 text-sm rounded font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity"
                    style={{ backgroundColor: NAVY }}
                    onClick={() => { setIsUnlocking(true); unlockContact({ id: leadId }); }}
                    disabled={isUnlocking}
                  >
                    {isUnlocking ? (
                      <><Lock size={17} className="animate-pulse" /> Unlocking...</>
                    ) : (
                      <><span>Unlock Contact Details</span><ChevronRight size={17} /></>
                    )}
                  </button>
                )}
                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                  <CreditCard size={12} /> Contact information will be revealed after purchase
                </p>
                <p className="text-center text-xs text-gray-400 mt-1">
                  Not verified leads are fully refundable if contact information is invalid
                </p>
              </div>
            </div>

            <div className="border border-blue-100 bg-blue-50 rounded-lg p-5 text-center">
              <ShieldCheck size={28} className="mx-auto mb-2" style={{ color: NAVY }} />
              <h4 className="font-bold text-sm mb-1" style={{ color: NAVY }}>FindBuilders Guarantee</h4>
              <p className="text-xs text-blue-800/80">If the contact information is invalid, we will refund your lead credit automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
