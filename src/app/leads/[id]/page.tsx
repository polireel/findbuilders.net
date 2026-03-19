import { Suspense } from "react";
import LeadDetailClient from "./LeadDetailClient";

export default function LeadDetailPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-32 bg-slate-200 rounded"></div>
          <div className="h-16 w-3/4 bg-slate-200 rounded"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 h-64 bg-slate-200 rounded-2xl"></div>
            <div className="h-96 bg-slate-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    }>
      <LeadDetailClient />
    </Suspense>
  );
}
