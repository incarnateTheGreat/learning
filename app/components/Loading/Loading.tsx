import classNames from "classnames";

type LoadingProps = {
  type?: string;
};

const LoadingSpinner = () => (
  <div className="loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const Loading = ({ type = "" }: LoadingProps) => {
  if (type === "page") {
    return (
      <div
        className={classNames({
          "flex w-full items-center justify-center": type === "page",
        })}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return <LoadingSpinner />;
};

export default Loading;
