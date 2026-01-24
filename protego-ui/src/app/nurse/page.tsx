import NurseContent from "@/components/NurseContent";
import { StatusBar } from "@/components/ui/StatusBar";
import { Header } from "@/components/ui/Header";
import { Badge } from "@/components/ui/Badge";

export default function NursePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex justify-center">
      <main className="w-full max-w-md">
        <div className="flex flex-col min-h-screen">
          <StatusBar time="2:47" />
          <div className="flex items-center justify-between px-4 h-14">
            <Header title="Transaction" showBack backHref="/protect" />
            <Badge variant="low">Low</Badge>
          </div>
          <NurseContent />
        </div>
      </main>
    </div>
  );
}
