import { Suspense } from "react";
import SubmitProjectClient from "./SubmitProjectClient";

export const metadata = {
  title: "Submit Project | FindBuilders.net",
  description: "Submit your construction project and get free quotes from qualified contractors.",
};

export default function SubmitProjectPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center py-24 text-gray-500">Loading...</div>}>
      <SubmitProjectClient />
    </Suspense>
  );
}
