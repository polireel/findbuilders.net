"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, Clock, Send } from "lucide-react";
import { useCreateLead, useListCategories } from "@/lib/api-client";

export default function PostLeadClient() {
  const router = useRouter();
  const { data: categoriesData } = useListCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const { mutate: createLead } = useCreateLead({
    mutation: {
      onSuccess: () => {
        setIsSubmitting(false);
        setToast({ msg: "Project Posted Successfully! Contractors will review your project soon.", type: "success" });
        setTimeout(() => { router.push("/leads"); }, 2000);
      },
      onError: () => {
        setIsSubmitting(false);
        setToast({ msg: "Error submitting project. Please check your inputs and try again.", type: "error" });
        setTimeout(() => setToast(null), 4000);
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    createLead({
      data: {
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        budgetMin: parseInt(formData.get("budgetMin") as string, 10),
        budgetMax: parseInt(formData.get("budgetMax") as string, 10),
        timeline: formData.get("timeline") as string,
        clientName: formData.get("clientName") as string,
        clientEmail: formData.get("clientEmail") as string,
        clientPhone: formData.get("clientPhone") as string,
        isUrgent: formData.get("isUrgent") === "on",
      },
    });
  };

  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";

  return (
    <>
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl z-50 max-w-sm text-white ${toast.type === "success" ? "bg-emerald-700" : "bg-red-700"}`}>
          {toast.msg}
        </div>
      )}

      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Post Your Construction Project
          </h1>
          <p className="text-xl text-slate-400">
            Get quotes from local, pre-vetted contractors ready to start your project.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 mb-6">Project Details</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-1.5">Project Title <span className="text-red-500">*</span></label>
                      <input required name="title" type="text" placeholder="e.g., Full Master Bathroom Remodel" className={inputClass} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">Trade Category <span className="text-red-500">*</span></label>
                        <select required name="category" className={`${inputClass} appearance-none`}>
                          <option value="">Select a category...</option>
                          {categoriesData?.categories?.map((c) => (
                            <option key={c.slug} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">Timeline <span className="text-red-500">*</span></label>
                        <select required name="timeline" className={`${inputClass} appearance-none`}>
                          <option value="">When do you want to start?</option>
                          <option value="ASAP">As soon as possible</option>
                          <option value="1-2 weeks">1 to 2 weeks</option>
                          <option value="2-4 weeks">2 to 4 weeks</option>
                          <option value="1-3 months">1 to 3 months</option>
                          <option value="Flexible">Flexible timeframe</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-1.5">Project Description <span className="text-red-500">*</span></label>
                      <textarea required name="description" rows={5} placeholder="Please describe what you need done in detail." className={`${inputClass} resize-none`}></textarea>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">Minimum Budget ($) <span className="text-red-500">*</span></label>
                        <input required name="budgetMin" type="number" min="0" placeholder="e.g. 5000" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">Maximum Budget ($) <span className="text-red-500">*</span></label>
                        <input required name="budgetMax" type="number" min="0" placeholder="e.g. 15000" className={inputClass} />
                      </div>
                    </div>
                    <label className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl cursor-pointer">
                      <input type="checkbox" name="isUrgent" className="mt-1 w-4 h-4 text-red-600 border-red-300 rounded" />
                      <div>
                        <span className="block font-bold text-red-800">This is an emergency/urgent request</span>
                        <span className="block text-sm text-red-600">Select if you need immediate service.</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 mb-6">Location & Contact</h2>
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">City <span className="text-red-500">*</span></label>
                        <input required name="city" type="text" placeholder="e.g. Austin" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">State (Abbr.) <span className="text-red-500">*</span></label>
                        <input required name="state" type="text" maxLength={2} placeholder="e.g. TX" className={`${inputClass} uppercase`} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input required name="clientName" type="text" placeholder="John Doe" className={inputClass} />
                      <p className="text-xs text-slate-500 mt-1.5">Only verified contractors who unlock your lead will see your full name.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                        <input required name="clientEmail" type="email" placeholder="john@example.com" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                        <input required name="clientPhone" type="tel" placeholder="(555) 123-4567" className={inputClass} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-10 py-4 text-lg rounded-xl font-bold bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <><Send className="animate-pulse" /> Publishing...</> : "Post Project Lead"}
                  </button>
                  <p className="text-sm text-slate-500 mt-4 max-w-lg">By submitting, you agree to our Terms of Service. Your contact information is kept secure.</p>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><ShieldCheck className="text-blue-600" /> Why Post Here?</h3>
              <ul className="space-y-4">
                {[
                  { title: "Vetted Professionals", desc: "Every contractor passes a strict background and license check." },
                  { title: "Fast Responses", desc: "Projects receive an average of 3 qualified quotes within 24 hours." },
                  { title: "100% Free", desc: "Posting a project is completely free for homeowners and businesses." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <strong className="block text-sm text-blue-900">{item.title}</strong>
                      <span className="text-xs text-blue-800/80">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Clock className="text-slate-400" /> What happens next?</h3>
              <ol className="relative border-l border-slate-200 ml-3 space-y-5 pb-2 text-sm text-slate-600">
                {[
                  { title: "We review your project", desc: "Our team verifies details to ensure quality." },
                  { title: "Contractors are notified", desc: "Matching local professionals see your anonymous details." },
                  { title: "Get contacted", desc: "Up to 3 pros unlock your info and reach out with quotes." },
                ].map((step, i) => (
                  <li key={i} className="pl-6 relative">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary"></span>
                    <strong className="text-slate-900 block">{step.title}</strong>
                    {step.desc}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
