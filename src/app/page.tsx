"use client";

import Link from "next/link";
import { ClipboardList, Users, Clock, CheckCircle, ExternalLink } from "lucide-react";

const NAVY = "#0F3D66";
const ORANGE = "#f97316";

export default function Home() {
  return (
    <>
      {/* Sponsored Ad Banner */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
            <img
              src="/findbuilders/images/hero-bg.png"
              alt="ad"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">Construction Financing Made Simple</p>
            <p className="text-xs text-gray-500 truncate">Get fast approvals and flexible terms for your construction projects. Competitive rates from $100K to $50M+</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ExternalLink size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded">Sponsored</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/findbuilders/images/hero-bg.png"
            alt="Construction cranes at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy opacity-60" style={{ backgroundColor: NAVY }} />
        </div>
        <div className="relative z-10 text-center px-4 py-16 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Find Trusted Contractors for Your<br />Construction Project
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Connect with pre-screened, qualified contractors in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/submit-project"
              className="inline-flex items-center justify-center px-6 py-3 rounded text-sm font-semibold text-white border border-white hover:bg-white hover:text-navy transition-colors"
              style={{ "--tw-hover-text": NAVY } as React.CSSProperties}
            >
              Get Free Quotes →
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-6 py-3 rounded text-sm font-semibold bg-white transition-colors hover:bg-gray-100"
              style={{ color: NAVY }}
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: NAVY }}>
              Why Choose FindBuilders.net?
            </h2>
            <p className="text-gray-500">We make finding the right contractor simple, fast, and stress-free</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ClipboardList size={28} />,
                title: "Vetted Contractors",
                desc: "Work with pre-screened, licensed contractors who have proven track records in your area",
              },
              {
                icon: <Users size={28} />,
                title: "Multiple Quotes",
                desc: "Compare quotes from multiple qualified contractors to get the best value for your project",
              },
              {
                icon: <Clock size={28} />,
                title: "Fast Response",
                desc: "Get connected with contractors quickly - most projects receive responses within 24 hours",
              },
              {
                icon: <CheckCircle size={28} />,
                title: "100% Free",
                desc: "No fees, no obligations. Submit your project details and get free quotes from contractors",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#e8f0f8", color: NAVY }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: NAVY }}>
              How It Works
            </h2>
            <p className="text-gray-500">Getting started with your construction project is easy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: "1",
                color: NAVY,
                title: "Describe Your Project",
                desc: "Fill out a simple form with details about your construction project, timeline, and budget",
              },
              {
                num: "2",
                color: ORANGE,
                title: "Get Matched",
                desc: "We connect you with qualified contractors in your area who specialize in your type of project",
              },
              {
                num: "3",
                color: NAVY,
                title: "Compare & Choose",
                desc: "Review quotes, check references, and select the contractor that best fits your needs",
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mb-5 shadow-md"
                  style={{ backgroundColor: step.color }}
                >
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Construction Project?
          </h2>
          <p className="text-blue-200 mb-8 text-base">
            Join thousands of homeowners and businesses who found their perfect contractor through FindBuilders.net
          </p>
          <Link
            href="/submit-project"
            className="inline-flex items-center justify-center px-8 py-3 rounded text-sm font-semibold border border-white text-white hover:bg-white transition-colors"
            style={{ "--tw-hover-text": NAVY } as React.CSSProperties}
          >
            Get Free Quotes Now →
          </Link>
        </div>
      </section>
    </>
  );
}
