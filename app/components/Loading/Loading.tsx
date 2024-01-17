import classNames from "classnames";

type LoadingProps = InnerDivsProps & {
  type?: string;
};

type InnerDivsProps = {
  classnames_divs?: string;
};

const LoadingSpinner = ({ classnames_divs }: InnerDivsProps) => (
  <div className="loading">
    <div className={classnames_divs}></div>
    <div className={classnames_divs}></div>
    <div className={classnames_divs}></div>
    <div className={classnames_divs}></div>
  </div>
);

const Loading = ({ type = "", classnames_divs = "" }: LoadingProps) => {
  if (type === "page") {
    return (
      <div
        className={classNames({
          "flex w-full items-center justify-center": type === "page",
        })}
      >
        <LoadingSpinner classnames_divs={classnames_divs} />
      </div>
    );
  }

  return <LoadingSpinner classnames_divs={classnames_divs} />;
};

export default Loading;
