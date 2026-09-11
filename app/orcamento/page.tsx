import type { Metadata } from "next";
import { ProposalView } from "@/components/ProposalView";

export const metadata: Metadata = {
  title: "A Tua Proposta Yuppi",
  robots: { index: false, follow: false },
};

export default async function OrcamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string }>;
}) {
  const { d } = await searchParams;
  return <ProposalView d={d} />;
}
