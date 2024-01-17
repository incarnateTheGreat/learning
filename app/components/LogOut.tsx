"use client";

import { useState } from "react";
import { Button } from "learning/@/components/ui/Button/Button";

import { logOut } from "../login/actions";

import Loading from "./Loading/Loading";

type LogOutProps = {
  classnames?: string;
};

const LogOut = ({ classnames = "" }: LogOutProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className={classnames}
      onClick={() => {
        setLoading(true);
        logOut();
      }}
    >
      {loading ? <Loading classnames_divs="dark" /> : "Log out"}
    </Button>
  );
};

export default LogOut;
