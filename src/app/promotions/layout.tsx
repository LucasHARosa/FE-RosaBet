import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promoções",
  description: "Resgate suas promoções e divirta-se!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
