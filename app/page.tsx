import { Suspense } from "react";
import supabaseServer from "learning/lib/supabaseServer";

import LeagueList from "./components/FPL";
import Loading from "./components/Loading/Loading";
import ManagerIds from "./components/ManagerIds";
import { getSupabaseSession } from "./utils";

export default async function Home() {
  const session = await getSupabaseSession();

  const { data, error } = await supabaseServer()
    .from("users")
    .select()
    .eq("email", session?.user?.email)
    .single();

  if (error) {
    return (
      <Suspense fallback={<Loading type="page" />}>
        <section className="grid w-full grid-cols-1 gap-4 p-2 md:grid-cols-3 md:p-6">
          Sorry. There was a problem loading your account. Please try again
          later.
        </section>
      </Suspense>
    );
  }

  if (!data || data?.fpl_ids.length === 0 || !data?.fpl_ids) {
    return (
      <Suspense fallback={<Loading type="page" />}>
        <section className="mx-auto flex w-[450px] flex-col self-center">
          <h1 className="text-xl font-semibold">
            Sorry. There are no FPL Ids associated with this account.
          </h1>
          <ManagerIds />
        </section>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading type="page" />}>
      <section className="grid w-full grid-cols-1 gap-4 p-2 md:grid-cols-3 md:p-6">
        {data?.fpl_ids.map((id: number) => <LeagueList key={id} id={id} />)}
      </section>
    </Suspense>
  );
}
