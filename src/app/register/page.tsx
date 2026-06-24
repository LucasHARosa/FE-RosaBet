"use client";
import { UserContext } from "@/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Register() {
  const router = useRouter();
  const pathname = usePathname();
  const { openRegister, isAuthenticaded, loading } = useContext(UserContext);
  useEffect(() => {
    if (loading) return;

    const path = pathname.split("/");
    if (path.includes("register") && !isAuthenticaded) {
      openRegister();
    }
    router.replace("/");
  }, [loading]);

  return <div>Carregando...</div>;
}
