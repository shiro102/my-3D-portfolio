"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const NavLink = ({ link, is3D, locale }: { link: { url: string; title: string }; is3D?: boolean, locale: string }) => {
  const pathName = usePathname();
  const { t } = useTranslation('')

  return (
    <Link
      className={`rounded p-1 whitespace-nowrap ${
        (pathName === `/${locale}${link.url === "/" ? "": link.url}` || (is3D && link.url === `/${locale}/work`)) && "bg-black text-white dark:bg-white dark:text-black"
      }`}
      href={link.url}
    >
      {t("navbar-" + link.title.toLowerCase())}
    </Link>
  );
};

export default NavLink;
