"use client";

import classNames from "classnames";
import { NAV_CLASSES } from "learning/app/utils/constants";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const links = [
  {
    name: "Manager Ids",
    link: "manager_ids",
  },
];

const SettingsNav = () => {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <nav className="w-full border-b px-6 py-4 md:w-44 md:border-r">
      <ul>
        <li>
          {links.map((linkObj) => {
            const { name, link } = linkObj;

            return (
              <Link
                key={link}
                href={`/settings/${link}`}
                className={classNames(NAV_CLASSES, {
                  "text-foreground/80": activeSegment === link,
                })}
              >
                {name}
              </Link>
            );
          })}
        </li>
      </ul>
    </nav>
  );
};

export default SettingsNav;
