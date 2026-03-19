"use client";

import { useState } from "react";
import { BarChart2, Eye, Target, CheckCircle } from "lucide-react";

const NAVY = "#0F3D66";
const ORANGE = "#f97316";

export default function BecomeAdvertiserPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 bg-white";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const stats = [
    { label: "Monthly Visitors", value: "120K+" },
    { label: "Active Contractors", value: "8,000+" },
    { label: "Project Leads/Month", value: "2,500+" },
  ];

  return (
    <>
      <div className="py-12" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Become an Advertiser</h1>
          <p className="text-blue-200">Reach thousands of active contractors and homeowners</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {stats.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <p className="text-3xl font-extrabold mb-1" style={{ color: NAVY }}>{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 text-lg">Why Advertise Here?</h3>
            {[
              { icon: <Target size={20} />, title: "Highly Targeted Audience", desc: "Reach contractors actively looking for suppliers, tools, and services." },
              { icon: <Eye size={20} />, title: "High Visibility Placements", desc: "Banner and featured ad spots throughout the platform." },
              { icon: <BarChart2 size={20} />, title: "Performance Tracking", desc: "Monitor impressions, clicks, and conversions in real time." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: ORANGE }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-800 mb-1">Advertising Packages</p>
              <ul className="space-y-1 text-xs">
                <li>• Banner Ads from <strong>$299/mo</strong></li>
                <li>• Featured Listings from <strong>$499/mo</strong></li>
                <li>• Sponsored Content from <strong>$799/mo</strong></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: NAVY }} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Application Received!</h3>
                <p className="text-gray-500 max-w-md mx-auto">Our advertising team will review your inquiry and reach out within 1-2 business days with package details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-5 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
                    <input required type="text" placeholder="Your company" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Name *</label>
                    <input required type="text" placeholder="Your name" className={inputClass} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input required type="email" placeholder="contact@company.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input type="tel" placeholder="(555) 000-0000" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Advertising Budget *</label>
                  <select required className={inputClass}>
                    <option value="">Select budget range</option>
                    <option>Under $500/mo</option>
                    <option>$500 – $1,000/mo</option>
                    <option>$1,000 – $2,500/mo</option>
                    <option>$2,500+/mo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell us about your product/service</label>
                  <textarea rows={4} placeholder="What are you advertising?" className={`${inputClass} resize-none`} />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded text-sm font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: NAVY }}
                >
                  {submitting ? "Sending..." : "Request Advertising Info"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
