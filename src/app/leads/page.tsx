import { Suspense } from "react";
import LeadsClient from "./LeadsClient";

export const metadata = {
  title: "Construction Leads | FindBuilders",
  description: "Browse verified, high-quality construction project leads actively seeking contractor quotes.",
};

export default function LeadsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center text-slate-500">Loading leads...</div>
      </div>
    }>
      <LeadsClient />
    </Suspense>
  );
}
