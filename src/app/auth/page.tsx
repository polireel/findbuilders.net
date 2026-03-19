"use client";

import { useState } from "react";
import Link from "next/link";

const NAVY = "#0F3D66";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 bg-white";

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
              </svg>
            </div>
            <span className="font-bold text-xl" style={{ color: NAVY }}>FindBuilders.net</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{isLogin ? "Welcome back" : "Create your account"}</h1>
          <p className="text-sm text-gray-500 mt-1">{isLogin ? "Sign in to your account" : "Join thousands of contractors"}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-7 space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input type="text" placeholder="Your name" className={inputClass} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
            <input type="email" placeholder="your@email.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
            <input type="password" placeholder="••••••••" className={inputClass} />
          </div>
          {isLogin && (
            <div className="text-right">
              <button className="text-xs font-medium" style={{ color: NAVY }}>Forgot password?</button>
            </div>
          )}
          <button
            className="w-full py-3 rounded text-sm font-semibold text-white"
            style={{ backgroundColor: NAVY }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="font-semibold" style={{ color: NAVY }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
