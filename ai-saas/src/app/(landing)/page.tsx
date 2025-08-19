import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import UseCases from "@/components/landing/use-cases";
import Pricing from "@/components/landing/pricing";
import CTA from "@/components/landing/cta";

export default async function LandingPage() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Hero />
      <Features />
      <UseCases />
      <Pricing />
      <CTA />
    </div>
  );
}
