import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Clock, DollarSign, Users, ChevronRight, ShieldCheck, AlertTriangle } from "lucide-react";
import type { Lead } from "@/lib/api-client";

const NAVY = "#0F3D66";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: NAVY }}
          >
            {lead.category}
          </span>
          <div className="flex gap-2">
            {lead.isUrgent && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                <AlertTriangle size={11} />
                Urgent
              </span>
            )}
            {lead.isVerified && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <ShieldCheck size={11} />
                Verified
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight" style={{ color: "#1a202c" }}>
          <Link href={`/leads/${lead.id}`} className="hover:underline" style={{ color: NAVY }}>
            {lead.title}
          </Link>
        </h3>

        <p className="text-gray-500 text-sm mb-5 line-clamp-2">{lead.description}</p>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-gray-400" />
            <span className="truncate">{lead.city}, {lead.state}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={15} className="text-gray-400" />
            <span className="font-semibold text-gray-800">
              {formatCurrency(lead.budgetMin)} – {formatCurrency(lead.budgetMax)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-gray-400" />
            <span className="truncate">{lead.timeline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={15} className="text-gray-400" />
            <span>{lead.interestedCount} interested</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(lead.postedAt))} ago
        </span>
        <Link
          href={`/leads/${lead.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: NAVY }}
        >
          View Details
          <ChevronRight size={15} />
        </Link>
      </div>
    </div>
  );
}
