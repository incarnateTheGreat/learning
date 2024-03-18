type PointsProps = {
  total_points: number;
};

const Points = ({ total_points }: PointsProps) => {
  return (
    <div className="my-2 md:mt-0">
      <span className="mr-2 text-5xl font-semibold">{total_points}</span>
      <span>{total_points === 1 ? "pt." : "pts."}</span>
    </div>
  );
};

export default Points;
