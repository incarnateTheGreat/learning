import supabaseServer from "learning/lib/supabaseServer";
import Link from "next/link";

import LogOut from "./LogOut";

const Nav = async () => {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  return (
    <ul className="flex items-center justify-between">
      <li>
        <Link href="/" title="FPLConnector">
          FPLConnector
        </Link>
      </li>
      {session ? (
        <li>
          <LogOut classnames="w-20 font-semibold" />
        </li>
      ) : null}
    </ul>
  );
};

export default Nav;
