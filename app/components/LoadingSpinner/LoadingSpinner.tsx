"use client";

import { useTransition } from "react";
import classNames from "classnames";
import { useToast } from "learning/@/components/ui/Toaster/use-toast";
import { refreshPlayerData } from "learning/app/player/[...entry]/actions/actions";
import refreshImg from "learning/public/refresh.svg";
import Image from "next/image";

type LoadingSpinnerProps = {
  entry: number;
  classnames?: string;
};

const LoadingSpinner = ({ entry, classnames = "" }: LoadingSpinnerProps) => {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();

        startTransition(async () => {
          await refreshPlayerData(entry);

          toast({
            title: "Player data has been updated.",
          });
        });
      }}
      className={classNames("loadingSpinner", classnames)}
    >
      <Image
        src={refreshImg}
        alt="Refresh"
        className={classNames({
          loading: pending,
        })}
      />
    </button>
  );
};

export default LoadingSpinner;
