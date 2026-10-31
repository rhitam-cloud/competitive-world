import React from "react";
import { AdminNav } from "@/components/admin/AdminNav";
import { BulkImportClient } from "./import-client";

export const metadata = {
  title: "Bulk CSV Question Import - Admin Portal",
};

export default function AdminImportPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Bulk Question Import (CSV)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Rapidly upload hundreds of competitive exam questions via standard CSV format with automated row-level validation.
          </p>
        </div>

        <BulkImportClient />
      </div>
    </div>
  );
}
