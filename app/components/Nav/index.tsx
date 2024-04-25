"use client";

import { useEffect, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavElements from "./NavElements";

const Nav = () => {
  const pathname = usePathname();

  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  useEffect(() => {
    setDisplayMobileMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (displayMobileMenu) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }, [displayMobileMenu]);

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
            <NavElements setDisplayMobileMenu={setDisplayMobileMenu} />
          </ul>
          {displayMobileMenu ? (
            <ul className="absolute left-0 top-[60px] z-10 h-full w-full bg-background px-6 md:hidden">
              <NavElements
                setDisplayMobileMenu={setDisplayMobileMenu}
                childClassnames="mb-1 text-base"
              />
            </ul>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
