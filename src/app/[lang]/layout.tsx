import { ThemeProvider } from "next-themes";
import CookieConsent from "@/components/CookieConsent";
import WebVitals from "@/components/WebVitals";
import Footer from "@/components/Footer";
import { getDictionary, getLangFromParams } from "@/i18n";

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <Footer lang={lang} dict={dict} />
      <CookieConsent />
      <WebVitals />
    </ThemeProvider>
  );
}
