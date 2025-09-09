import "./assets/css/purged/globals.css";
import "./assets/css/purged/theme.css";
import { Poppins } from "next/font/google";
import { siteConfig } from "@/config/site";
import Providers from "@/providers/providers";
import TanstackProvider from "@/providers/providers.client";
import "@/lib/suppress-warnings";
import WarningSuppressor from "@/components/client/warning-suppressor";
import BodyClassHandler from "@/components/client/body-class-handler";
import { cn } from "@/lib/utils";
import Script from "next/script";
// import "flatpickr/dist/themes/light.css"; // Removed dependency
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={cn("dash-tail-app", poppins.className)}>
        <WarningSuppressor />
        <BodyClassHandler />
        <TanstackProvider>
          <Providers>{children}</Providers>
        </TanstackProvider>
      </body>
    </html>
  );
}
