import { redirect } from "next/navigation";

type NavButtonProps = {
  page: number;
  id: number;
};

const PrevButton = async ({ page, id }: NavButtonProps) => {
  return (
    <form
      action={async () => {
        "use server";

        let prev_page = page;

        prev_page -= 1;

        if (prev_page === 1) {
          redirect(`/league/${id}`);
        } else {
          redirect(`/league/${id}/${prev_page}`);
        }
      }}
    >
      <button>Prev</button>
    </form>
  );
};

const NextButton = async ({ page, id }: NavButtonProps) => {
  return (
    <form
      className={page === 1 ? "ml-auto" : ""}
      action={async () => {
        "use server";

        let next_page = page;

        next_page += 1;

        redirect(`/league/${id}/${next_page}`);
      }}
    >
      <button>Next</button>
    </form>
  );
};

export { NextButton, PrevButton };
