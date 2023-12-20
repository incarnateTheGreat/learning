"use client";

import classNames from "classnames";
import { useEventStore } from "learning/app/store/eventStore";
import refreshImg from "learning/public/refresh.svg";
import Image from "next/image";

const LoadingSpinner = () => {
  const loading = useEventStore.getState().loading;

  return (
    <button className="lds-ring">
      <Image
        src={refreshImg}
        alt="Refresh"
        className={classNames({
          loading: loading,
        })}
      />
    </button>
  );
};

export default LoadingSpinner;
