"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useCreateLead, useListCategories } from "@/lib/api-client";

const NAVY = "#0F3D66";

export default function SubmitProjectClient() {
  const router = useRouter();
  const { data: categoriesData } = useListCategories();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: createLead } = useCreateLead({
    mutation: {
      onSuccess: () => {
        setIsSubmitting(false);
        setSubmitted(true);
      },
      onError: () => {
        setIsSubmitting(false);
        setError("Something went wrong. Please check your inputs and try again.");
      },
    },
  });

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    createLead({
      data: {
        title: `${formData.get("projectType")} - ${formData.get("contactName")}`,
        category: formData.get("projectType") as string,
        description: formData.get("description") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        budgetMin: parseInt((formData.get("budget") as string).split("-")[0] || "5000"),
        budgetMax: parseInt((formData.get("budget") as string).split("-")[1] || "25000"),
        timeline: formData.get("timeline") as string,
        clientName: formData.get("contactName") as string,
        clientEmail: formData.get("email") as string,
        clientPhone: formData.get("phone") as string,
        isUrgent: formData.get("timeline") === "ASAP",
      },
    });
  };

  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#e8f0f8" }}>
            <CheckCircle size={40} style={{ color: NAVY }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: NAVY }}>Project Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for submitting your project. Qualified contractors will review your request and reach out with free quotes shortly.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: NAVY }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-10" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Submit Your Project</h1>
          <p className="text-blue-200">Get free quotes from qualified contractors in your area</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Type *</label>
                <select required name="projectType" className={inputClass}>
                  <option value="">Select project type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  {categoriesData?.categories?.map((c) => (
                    <option key={c.slug} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget *</label>
                <select required name="budget" className={inputClass}>
                  <option value="">Select budget range</option>
                  <option value="5000-15000">$5,000 – $15,000</option>
                  <option value="15000-50000">$15,000 – $50,000</option>
                  <option value="50000-150000">$50,000 – $150,000</option>
                  <option value="150000-500000">$150,000 – $500,000</option>
                  <option value="500000-999999">$500,000+</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Timeline to Start *</label>
                <select required name="timeline" className={inputClass}>
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="30-60 days">30-60 days</option>
                  <option value="2-4 months">2-4 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                <input required name="city" type="text" placeholder="e.g. San Francisco" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">State (Abbr.) *</label>
              <input required name="state" type="text" maxLength={2} placeholder="e.g. CA" className={`${inputClass} max-w-24 uppercase`} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Description *</label>
              <textarea
                required
                name="description"
                rows={4}
                placeholder="Please describe your project in detail..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <hr className="border-gray-200" />

            <h3 className="text-base font-semibold text-gray-800">Contact Information</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Name *</label>
                <input required name="contactName" type="text" placeholder="Full name" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input required name="email" type="email" placeholder="your@email.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
              <input required name="phone" type="tel" placeholder="(555) 123-4567" className={inputClass} />
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 rounded text-sm font-semibold text-white disabled:opacity-60 transition-opacity"
              style={{ backgroundColor: NAVY }}
            >
              {isSubmitting ? "Submitting..." : "Get Free Quotes →"}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              By submitting, you agree to our Terms of Service. Your contact information is kept secure and only shared with matched contractors.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
