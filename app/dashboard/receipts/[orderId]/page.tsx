import { ReceiptPageContent } from "@/components/dashboard/ReceiptPageContent";

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <ReceiptPageContent orderId={orderId} />;
}
