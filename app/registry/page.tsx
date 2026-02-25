import { Metadata } from "next";
import { giftsConfig } from "@/config/gifts";
import RegistryPageClient from "@/components/RegistryPageClient";

export const metadata: Metadata = {
  title: "Gift Registry | Neelu & Aditya's Wedding",
  description:
    "Your presence is our present. If you wish to bless us with a gift, here is our wedding registry.",
};

export default function RegistryPage() {
  if (!giftsConfig.enabled) {
    return (
      <main className="min-h-screen bg-[#FFFFF0] flex items-center justify-center px-4">
        <p className="font-body text-[#3D2B1F]/60">
          Registry is not available at this time.
        </p>
      </main>
    );
  }

  return <RegistryPageClient />;
}
