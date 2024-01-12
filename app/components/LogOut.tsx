"use client";

import { useState } from "react";
import { Button } from "learning/@/components/ui/Button/Button";

import { logOut } from "../login/actions";

import Loading from "./Loading/Loading";

const LogOut = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={() => {
        setLoading(true);
        logOut();
      }}
    >
      {loading ? <Loading /> : "Log out"}
    </Button>
  );
};

export default LogOut;
