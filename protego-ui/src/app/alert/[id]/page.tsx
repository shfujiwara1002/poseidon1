import { AlertDetail } from "@/components/screens/AlertDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AlertPage({ params }: PageProps) {
  const { id } = await params;
  return <AlertDetail id={id} />;
}
