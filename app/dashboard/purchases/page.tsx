import { Suspense } from "react";

import { DashboardPurchasesContent } from "@/components/dashboard/DashboardPurchasesContent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function DashboardPurchasesPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex max-w-4xl justify-center py-16">
          <LoadingSpinner label="Loading purchases" />
        </div>
      }
    >
      <DashboardPurchasesContent />
    </Suspense>
  );
}
