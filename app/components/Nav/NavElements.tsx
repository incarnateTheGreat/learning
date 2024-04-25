import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { LINKS, NAV_CLASSES } from "learning/app/utils/constants";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import LogOut from "../LogOut";

type NavElementsProps = {
  childClassnames?: string;
  setDisplayMobileMenu: Dispatch<SetStateAction<boolean>>;
};

const NavElements = ({
  childClassnames = "",
  setDisplayMobileMenu,
}: NavElementsProps) => {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <>
      {LINKS.map((linkObj) => {
        const { name, link } = linkObj;

        return (
          <li key={link} className={childClassnames}>
            <Link
              href={`/${link}`}
              className={classNames(NAV_CLASSES, {
                "text-foreground/80": activeSegment === link,
              })}
              onClick={() => setDisplayMobileMenu(false)}
            >
              {name}
            </Link>
          </li>
        );
      })}
      <li>
        <LogOut classnames="mt-8 w-full md:w-20 md:mt-0 font-semibold" />
      </li>
    </>
  );
};

export default NavElements;
