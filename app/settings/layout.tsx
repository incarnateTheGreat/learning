import { Suspense } from "react";

import Loading from "../components/Loading/Loading";

import SettingsNav from "./components/SettingsNav";

type SettingsLayoutProps = {
  readonly children: React.ReactNode;
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Suspense fallback={<Loading type="page" />}>
      <section className="flex flex-1">
        <SettingsNav />
        <div className="flex-1 px-8 py-4">{children}</div>
      </section>
    </Suspense>
  );
}
