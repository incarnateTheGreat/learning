import {
  DrawerDescription,
  DrawerTitle,
} from "learning/@/components/ui/Drawer/Drawer";

import Points from "./Points";

type HeaderProps = {
  first_name: string;
  second_name: string;
  is_captain: boolean;
  team_name: string;
  total_points: number;
};

const Header = ({
  first_name,
  second_name,
  is_captain,
  team_name,
  total_points,
}: HeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
      <div>
        <DrawerTitle className="text-3xl font-normal">
          <span>{first_name}</span>{" "}
          <span className="font-semibold">{second_name}</span>{" "}
          {is_captain ? <span className="font-semibold">(C)</span> : null}
        </DrawerTitle>
        <DrawerDescription className="text-center md:text-left">
          {team_name}
        </DrawerDescription>
      </div>
      <Points total_points={total_points} />
    </div>
  );
};

export default Header;
