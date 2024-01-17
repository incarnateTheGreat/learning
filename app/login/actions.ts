"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import supabaseServer from "learning/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { FPLResponse } from "../components/FPL";

type SignUpReturnType = {
  type: "default" | "destructive";
  message: string;
};

const signUp = async (queryData: FormData): Promise<SignUpReturnType> => {
  const cookieStore = cookies();
  const headersList = headers();
  const origin = headersList.get("origin");

  const email = String(queryData?.get("email"));
  const password = String(queryData?.get("password"));

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (user.identities.length === 0) {
    return {
      type: "destructive",
      message: "User already exists",
    };
  }

  if (error) {
    return {
      type: "destructive",
      message: error.message,
    };
  }

  return {
    type: "default",
    message: "A confirmation link has been sent to your email.",
  };
};

const doesManagerExist = async (id: number) => {
  try {
    const res: Response = await fetch(
      `https://fantasy.premierleague.com/api/entry/${id}/`,
    );

    const managerData: FPLResponse = await res.json();

    if (managerData?.detail === "Not found.") {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
  }
};

const updateManagerRow = async (fpl_ids: number[]) => {
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  await supabase
    .from("users")
    .update({ fpl_ids })
    .eq("email", session.user.email);

  redirect("/");
};

const insertRow = async (email = "") => {
  try {
    const cookieStore = cookies();

    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabaseServer().auth.getSession();

    await supabase.from("users").insert({
      email: session.user.email,
      fpl_ids: [],
    });

    revalidatePath("/");
  } catch (err) {
    return;
  }
};

const signIn = async (queryData: FormData) => {
  const headersList = headers();
  let referer = headersList.get("referer") ?? "/";

  if (referer.includes("login")) {
    referer = "/";
  }

  const cookieStore = cookies();

  const email = String(queryData?.get("email"));
  const password = String(queryData?.get("password"));

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return error.message;
  }

  redirect(referer);
};

const logOut = async () => {
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  await supabase.auth.signOut();

  redirect("/login");
};

export {
  doesManagerExist,
  insertRow,
  logOut,
  signIn,
  signUp,
  updateManagerRow,
};
