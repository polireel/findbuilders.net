import Link from "next/link";
import { Check } from "lucide-react";

const NAVY = "#0F3D66";
const ORANGE = "#f97316";

export const metadata = {
  title: "Pricing | FindBuilders.net",
  description: "Simple, transparent pricing for construction contractors.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for independent contractors getting started",
    cta: "Get Started Free",
    highlight: false,
    features: [
      "5 lead views per month",
      "Basic project details",
      "Email notifications",
      "Standard support",
    ],
    missing: ["Direct client contact info", "Priority lead access", "Verified badge"],
  },
  {
    name: "Professional",
    price: "$49",
    period: "/mo",
    desc: "Everything growing contractors need to win more jobs",
    cta: "Start Free Trial",
    highlight: true,
    features: [
      "Unlimited lead views",
      "Full project details & budgets",
      "Direct client contact info",
      "Priority lead access (24hr early)",
      "SMS + email notifications",
      "Standard support",
    ],
    missing: ["Verified contractor badge", "Dedicated account manager"],
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/mo",
    desc: "For large firms requiring maximum volume and custom integrations",
    cta: "Contact Sales",
    highlight: false,
    features: [
      "Everything in Professional",
      "Verified contractor badge",
      "Multi-user team accounts",
      "CRM API integration",
      "Dedicated account manager",
      "Custom lead routing",
    ],
    missing: [],
  },
];

export default function PricingPage() {
  return (
    <>
      <div className="py-14" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Simple, Transparent Pricing</h1>
          <p className="text-blue-200 text-lg">
            No hidden fees. No commissions on the jobs you win.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg border flex flex-col overflow-hidden ${plan.highlight ? "shadow-2xl" : "shadow border-gray-200"}`}
              style={{ borderColor: plan.highlight ? NAVY : undefined }}
            >
              {plan.highlight && (
                <div className="py-2 text-center text-sm font-bold text-white uppercase tracking-widest" style={{ backgroundColor: NAVY }}>
                  Most Popular
                </div>
              )}
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-5">{plan.desc}</p>
                <div className="mb-7 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold" style={{ color: NAVY }}>{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <Link
                  href="/auth"
                  className="block text-center py-3 rounded text-sm font-semibold mb-7 transition-colors"
                  style={plan.highlight
                    ? { backgroundColor: NAVY, color: "white" }
                    : { border: `1px solid ${NAVY}`, color: NAVY, backgroundColor: "transparent" }}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#d1fae5" }}>
                        <Check size={10} className="text-green-700" />
                      </div>
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-gray-100">
                        <span className="text-gray-400 text-xs">✕</span>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: NAVY }}>Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "Do you take a cut of my projects?", a: "Never. We only charge a flat monthly fee. Any money you make from jobs you win is 100% yours." },
              { q: "Are the leads verified?", a: "Yes, every lead is reviewed by our team to ensure the homeowner's intent and budget are legitimate before going live." },
              { q: "Can I cancel anytime?", a: "Absolutely. There are no long-term contracts. Cancel your subscription at any time from your account settings." },
              { q: "How quickly do new leads appear?", a: "New leads appear within hours of being submitted. Professional subscribers get 24-hour early access before Starter users." },
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
