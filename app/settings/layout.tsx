import SettingsNav from "./components/SettingsNav";

type SettingsLayoutProps = {
  readonly children: React.ReactNode;
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <section className="flex flex-1 flex-col md:flex-row">
      <SettingsNav />
      <div className="flex-1 px-6 py-4 md:px-8">{children}</div>
    </section>
  );
}
