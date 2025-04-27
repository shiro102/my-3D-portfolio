"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef } from "react";
import { Mail, Copy, Phone, FileText } from "lucide-react";
import { toast } from "sonner";
import { sendEmail } from "@/lib/actions/email/sendEmail";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  // Copy email address to clipboard
  const now = new Date();
  const { t } = useTranslation("");

  // Format date part: "Sunday, December 03, 2023"
  const datePart = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(now);

  // Format time part: "3:18 AM"
  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  // Combine into final format
  const finalFormatted = `${datePart} at ${timePart}`;

  const handleCardClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: (
        <span style={{ color: "var(--muted-foreground)" }}>
          {finalFormatted}
        </span>
      ),
      // action: {
      //   label: "Undo",
      //   onClick: () => console.log("Undo"),
      // },
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  // Send email function
  const handleEmailClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const form = formRef.current;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)
      ?.value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      ?.value;

    const error = await sendEmail({ name, email, subject, message });

    if (!error) {
      toast("Email sent successfully", {
        description: (
          <span style={{ color: "var(--muted-foreground)" }}>
            {finalFormatted}
          </span>
        ),
        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
      });
    } else {
      toast("Email sent failed", {
        description: (
          <span style={{ color: "red" }}>
            Failed to send email. Please use my email or phone number.
          </span>
        ),
        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
      });
    }
  };

  return (
    <div className="w-full bg-gradient-to-b p-2 pt-10 md:pt-0 from-white via-blue-50 to-red-50 flex flex-col items-center justify-center md:grid md:grid-cols-[40%_10%_40%] gap-5 dark:from-[#212121] dark:via-[#171d2d] dark:to-[#040211] dark:text-white">
      <div>
        {/* Header */}
        <div className="flex flex-col gap-y-5">
          {/* Title */}
          <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl font-bold">{t("contact-title")}</h1>
            <h2 className="text-lg">{t("contact-desc")}</h2>
          </div>

          {/* Contact Cards */}
          <div className="gap-y-5 flex flex-col">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => handleCardClick("khaihungluong@gmail.com")}
                    className="w-fit flex items-center gap-2 bg-white shadow-md border border-gray-200 px-4 py-2 rounded-full transition hover:shadow-lg"
                  >
                    <Mail className="h-5 w-5 text-[#4e74fd]" />
                    <span className="font-semibold text-[#4e74fd]">
                      khaihungluong@gmail.com
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="bg-white text-sm text-gray-700 px-3 py-2 rounded-lg shadow-lg border border-gray-200"
                  onClick={() => handleCardClick("khaihungluong@gmail.com")}
                >
                  <div className="flex items-center gap-2">
                    <span>Copy</span>
                    <Copy className="w-4 h-4" />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => handleCardClick("778-583-7088")}
                    className="w-fit flex items-center gap-2 bg-white shadow-md border border-gray-200 px-4 py-2 rounded-full transition hover:shadow-lg"
                  >
                    <Phone className="h-5 w-5 text-[#4e74fd]" />
                    <span className="font-semibold text-[#4e74fd]">
                      778-583-7088
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="bg-white text-sm text-gray-700 px-3 py-2 rounded-lg shadow-lg border border-gray-200"
                  onClick={() => handleCardClick("778-583-7088")}
                >
                  <div className="flex items-center gap-2">
                    <span>Copy</span>
                    <Copy className="w-4 h-4" />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="/resume/KhaiHungResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit flex items-center gap-2 bg-white shadow-md border border-gray-200 px-4 py-2 rounded-full transition hover:shadow-lg"
                  >
                    {/* You can use any icon, e.g., Download icon */}
                    <FileText className="h-5 w-5 text-[#4e74fd]" />
                    <span className="font-semibold text-[#4e74fd]">
                      View Resume
                    </span>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="bg-white text-sm text-gray-700 px-3 py-2 rounded-lg shadow-lg border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <span>Open</span>
                    <Copy className="w-4 h-4" />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="m-auto text-xl font-bold">{t("contact-or")}</div>
      {/* Input fields */}
      <div>
        <form
          className="flex flex-col justify-center gap-y-6 my-5 mx-7 bg-white rounded-xl p-10 shadow-2xl shadow-black-200 pb-16 border border-gray-200 text-black"
          ref={formRef}
          onSubmit={handleEmailClick}
        >
          <div className="flex items-center gap-2 text-3xl font-bold">
            <span className="text-3xl font-bold">
              {t("contact-sendmessage")} 💬
            </span>
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="text-lg">
              {t("contact-name")}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full rounded-md px-4 py-2 bg-gray-100 outline-none border border-transparent focus:border-[#4e74fd] focus:ring-2 focus:ring-[#4e74fd] transition-all duration-200 placeholder-gray-400"
              placeholder={`${t("contact-nameholder")}*`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-lg">
              {t("contact-email")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full rounded-md px-4 py-2 bg-gray-100 outline-none border border-transparent focus:border-[#4e74fd] focus:ring-2 focus:ring-[#4e74fd] transition-all duration-200 placeholder-gray-400"
              placeholder={`${t("contact-emailholder")}*`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-lg">
              {t("contact-subject")}
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="w-full rounded-md px-4 py-2 bg-gray-100 outline-none border border-transparent focus:border-[#4e74fd] focus:ring-2 focus:ring-[#4e74fd] transition-all duration-200 placeholder-gray-400"
              placeholder={`${t("contact-subjectholder")}*`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="message" className="text-lg">
              {t("contact-message")}
            </label>
            <textarea
              name="message"
              id="message"
              required
              className="w-full rounded-md px-4 py-2 bg-gray-100 outline-none border border-transparent focus:border-[#4e74fd] focus:ring-2 focus:ring-[#4e74fd] min-h-28 transition-all duration-200 placeholder-gray-400"
              placeholder={`${t("contact-messageholder")}*`}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg p-2 bg-black text-white hover:bg-slate-700 transition-all"
          >
            {t("contact-send")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
