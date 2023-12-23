"use client";

import { useTransition } from "react";
import classNames from "classnames";
import { useEventStore } from "learning/app/store/eventStore";
import Link from "next/link";

import navAction from "../actions/actions";

type NavFormProps = {
  page: number;
  id: number;
  has_next: boolean;
  standings: JSX.Element;
};

const logged_in_user = useEventStore.getState().leagueIDs;

const LeagueNavigationForm = ({
  page,
  id,
  has_next,
  standings,
}: NavFormProps) => {
  const [pending, startTransition] = useTransition();

  return (
    <section className="mx-auto my-4 w-[90%] text-sm md:w-4/5 md:max-w-[800px] md:text-base">
      <Link href="/" className="mb-8 flex">
        &laquo; Back to Home
      </Link>
      <div className="mb-4 flex justify-between">
        {page > 1 ? (
          <button
            onClick={() => {
              startTransition(async () => {
                await navAction(page, id, "prev");
              });
            }}
          >
            &laquo; Prev
          </button>
        ) : null}

        {has_next ? (
          <button
            className={classNames({
              "ml-auto": page === 1,
            })}
            onClick={() => {
              startTransition(async () => {
                await navAction(page, id);
              });
            }}
          >
            Next &raquo;
          </button>
        ) : null}
      </div>

      {pending ? <div>Loading...</div> : null}

      {!pending ? <>{standings}</> : null}
    </section>
  );
};

export default LeagueNavigationForm;