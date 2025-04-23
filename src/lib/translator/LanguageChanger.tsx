"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../../i18nConfig";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      className="bg-transparent focus:outline-none cursor-pointer text-[12px] w-[80px]"
    >
      <option
        className="bg-white text-black dark:bg-black dark:text-white"
        value="en"
      >
        English
      </option>
      <option
        className="bg-white text-black dark:bg-black dark:text-white"
        value="vi"
      >
        Tiếng Việt
      </option>
      <option
        className="bg-white text-black dark:bg-black dark:text-white"
        value="fr"
      >
        Français
      </option>
    </select>
  );
}
