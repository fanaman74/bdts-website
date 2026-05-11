import { Hero } from "@/components/sections/home/Hero";
import { ThreePaths } from "@/components/sections/home/ThreePaths";
import { WhyBDTS } from "@/components/sections/home/WhyBDTS";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreePaths />
      <WhyBDTS />
      <Testimonials />
      <HomeCTA />
    </>
  );
}
