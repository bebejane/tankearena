import "@/styles/index.scss";
import s from "./layout.module.scss";
import { NextIntlClientProvider } from "next-intl";
import { LocaleSwitcher } from "@/components/nav/LocaleSwitcher";
import { DraftModeContentLink } from "next-dato-utils/components";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body id="root" className="root">
        <main className={s.main}>{children}</main>
        <DraftModeContentLink />
      </body>
    </html>
  );
}
