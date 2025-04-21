"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link, is3D }: { link: { url: string; title: string }; is3D?: boolean }) => {
  const pathName = usePathname();
  
  return (
    <Link
      className={`rounded p-1 ${
        (pathName === link.url || (is3D && link.url === "/work")) && "bg-black text-white dark:bg-white dark:text-black"
      }`}
      href={link.url}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
