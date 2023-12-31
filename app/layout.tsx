import { cn } from "learning/@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import Header from "./components/Header";
import { eventStatus } from "./lib/actions";
import { useEventStore } from "./store/eventStore";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FPL RSC App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stateCurrentEvent = useEventStore.getState().currentEvent;

  if (!stateCurrentEvent) {
    const currentEvent = await eventStatus();

    useEventStore.setState(() => ({
      currentEvent,
    }));
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background flex min-h-screen flex-col bg-black font-sans text-white antialiased",
          fontSans.variable,
        )}
      >
        <Header />
        <main className="flex flex-1 flex-col p-6 md:flex-row">{children}</main>
        <footer className="border-t-header-footer-border border-t px-7 py-2 text-sm">
          &copy; {new Date().getFullYear()} FPLConnector.
        </footer>
      </body>
    </html>
  );
}
