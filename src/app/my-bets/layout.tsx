import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minhas apostas",
  description: "Acompanhe suas apostas e divirta-se!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
