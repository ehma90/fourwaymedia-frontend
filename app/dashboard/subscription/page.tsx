import { PricingPlansSection } from "@/components/pricing/PricingPlansSection";
import { SubscriptionFaq } from "@/components/dashboard/SubscriptionFaq";

export default function DashboardSubscriptionPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <PricingPlansSection />
      <SubscriptionFaq />
    </div>
  );
}
