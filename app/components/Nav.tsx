"use client";

import { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { NAV_CLASSES } from "../utils/constants";

import LogOut from "./LogOut";

const links = [
  {
    name: "Scores",
    link: "scores",
  },
  {
    name: "Settings",
    link: "settings",
  },
];

type NavElementsProps = {
  childClassnames?: string;
};

const Nav = () => {
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  const NavElements = ({ childClassnames = "" }: NavElementsProps) => {
    const activeSegment = useSelectedLayoutSegment();

    return (
      <>
        {links.map((linkObj) => {
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
          <LogOut classnames="w-20 font-semibold" />
        </li>
      </>
    );
  };

  return (
    <nav>
      <ul className="flex items-center justify-between">
        <li>
          <Link
            href="/"
            title="FPLConnector"
            onClick={() => setDisplayMobileMenu(false)}
          >
            FPLConnector
          </Link>
        </li>
        <li>
          <HamburgerMenuIcon
            className="flex cursor-pointer md:hidden"
            onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
          />
          <ul className="hidden items-center gap-6 text-sm md:flex">
            <NavElements />
          </ul>
          {displayMobileMenu ? (
            <ul className="absolute left-0 top-[60px] h-full w-full bg-background px-6 md:hidden">
              <NavElements childClassnames="mb-1 text-base" />
            </ul>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
