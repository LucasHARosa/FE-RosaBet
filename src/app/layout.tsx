import "@/assets/styles/global.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-multi-carousel/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { NextIntlClientProvider } from 'next-intl';
import React, { ReactNode } from "react";
import Header from "@/components/header";
import ModalCupom from "@/components/modal/cupom";
import SideBar from "@/components/sidebar";
import { CuponsProvider } from "@/contexts/CuponsContext";
import { GameProvider } from "@/contexts/GameContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { UserProvider } from "@/contexts/UserContext";
import StyledComponentsRegistry from "@/utils/config-style";
import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import { Space_Grotesk } from "next/font/google";
import Head from "next/head";
import { StorageProvider } from "@/contexts/StorageContext";
import { getLocale, getMessages } from 'next-intl/server';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "RosaBet",
    template: "%s | RosaBet",
  },
  description:
    "A RosaBet é a melhor casa de apostas do Brasil! Cotações imperdíveis, saques e depósitos instantâneos via PIX. Receba 100% de bônus no seu primeiro depósito.",
  openGraph: {
    siteName: "RosaBet",
    title: "RosaBet — A casa de apostas que aposta em você",
    description:
      "Apostas esportivas e cassino online com as melhores cotações. Depósito e saque instantâneo via PIX.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RosaBet",
    description: "A melhor casa de apostas do Brasil.",
  },
  icons: {
    icon: "/icon.ico",
    apple: "/icon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>
        <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover user-scalable=0"></meta>
      </Head>
      <body className={spaceGrotesk.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <StorageProvider>
            <ThemeProvider>
              <StyledComponentsRegistry>
                <ToastContainer />
                <UserProvider>
                  <SidebarProvider>
                    <GameProvider>
                      <CuponsProvider>
                        <Header />
                        <div className="container">
                          <SideBar />
                          <div className="body">{children}</div>
                          <ModalCupom />
                        </div>
                      </CuponsProvider>
                    </GameProvider>
                  </SidebarProvider>
                </UserProvider>
              </StyledComponentsRegistry>
            </ThemeProvider>
          </StorageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
