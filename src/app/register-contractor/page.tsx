"use client";

import { useState } from "react";
import { CheckCircle, ShieldCheck, TrendingUp, Users } from "lucide-react";

const NAVY = "#0F3D66";

export default function RegisterContractorPage() {
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

  return (
    <>
      <div className="py-12" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Register as a Contractor</h1>
          <p className="text-blue-200">Join thousands of contractors winning jobs through FindBuilders.net</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 text-lg">Why Register?</h3>
            {[
              { icon: <ShieldCheck size={20} />, title: "Verified Leads", desc: "Access real projects from homeowners actively seeking quotes." },
              { icon: <TrendingUp size={20} />, title: "Grow Your Business", desc: "Fill your pipeline with consistent, high-quality projects." },
              { icon: <Users size={20} />, title: "Build Your Reputation", desc: "Collect reviews and build a strong local presence." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: NAVY }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: NAVY }} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Application Received!</h3>
                <p className="text-gray-500 max-w-md mx-auto">Thank you for registering. Our team will review your application and contact you within 1-2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-5 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name *</label>
                    <input required type="text" placeholder="Your company name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Name *</label>
                    <input required type="text" placeholder="Your full name" className={inputClass} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input required type="email" placeholder="business@email.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                    <input required type="tel" placeholder="(555) 000-0000" className={inputClass} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Trade / Specialty *</label>
                    <select required className={inputClass}>
                      <option value="">Select your trade</option>
                      <option>General Contractor</option>
                      <option>Roofing</option>
                      <option>Plumbing</option>
                      <option>Electrical</option>
                      <option>HVAC</option>
                      <option>Painting</option>
                      <option>Flooring</option>
                      <option>Concrete</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">License Number</label>
                    <input type="text" placeholder="State license number" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Area *</label>
                  <input required type="text" placeholder="e.g. San Francisco Bay Area, CA" className={inputClass} />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded text-sm font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: NAVY }}
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By registering, you agree to our Terms of Service and contractor vetting process.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
