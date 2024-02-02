import ManagerIds from "learning/app/components/ManagerIds";
import { getFPLIds } from "learning/app/utils";

const Manager_Ids = async () => {
  const fpl_ids = await getFPLIds();

  return <ManagerIds fpl_ids={fpl_ids} classnames="max-w-[800px]" />;
};

export default Manager_Ids;
