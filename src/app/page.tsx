import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { ValueCards } from "@/components/home/ValueCards";
import { RecentNews } from "@/components/home/RecentNews";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction";
import { StatsSection } from "@/components/home/StatsSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueCards />
      <StatsSection />
      <Testimonials />
      <RecentNews />
      <CallToAction />
    </div>
  );
}
