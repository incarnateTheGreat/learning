import { Suspense } from "react";

import Loading from "../components/Loading/Loading";

const Settings = async () => {
  return (
    <Suspense fallback={<Loading type="page" />}>
      Select a page from the left navigation menu.
    </Suspense>
  );
};

export default Settings;
