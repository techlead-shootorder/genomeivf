import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best IVF clinic in Kolkata | Genome Fertility Centre",
  description: "Genome Fertility Centre - Best IVF clinic in Kolkata. Advanced IVF and fertility treatments with expert specialists. Get personalized fertility solutions for your family.",
};

export default function PmaxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
