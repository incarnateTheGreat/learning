import ManagerIds from "learning/app/components/ManagerIds";
import { getSupabaseSession } from "learning/app/utils";
import supabaseServer from "learning/lib/supabaseServer";

const Manager_Ids = async () => {
  const session = await getSupabaseSession();

  const {
    data: { fpl_ids },
  } = await supabaseServer()
    .from("users")
    .select("fpl_ids")
    .eq("email", session?.user?.email)
    .single();

  return <ManagerIds fpl_ids={fpl_ids} classnames="max-w-[800px]" />;
};

export default Manager_Ids;
