"use server";

import { redirect } from "next/navigation";

const navAction = async (page: number, id: number, direction = "next") => {
  let pageToChange = page;

  if (direction === "prev") {
    pageToChange -= 1;

    if (pageToChange === 1) {
      redirect(`/league/${id}`);
    } else {
      redirect(`/league/${id}/${pageToChange}`);
    }
  } else {
    pageToChange += 1;

    redirect(`/league/${id}/${pageToChange}`);
  }
};

export default navAction;
