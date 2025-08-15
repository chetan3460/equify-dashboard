import "./assets/css/globals.css";
import "./assets/css/theme.css";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/provider/providers.client";
import "@/lib/suppress-warnings";
import WarningSuppressor from "@/components/client/warning-suppressor";
import BodyClassHandler from "@/components/client/body-class-handler";
import { cn } from "@/lib/utils";
// import "flatpickr/dist/themes/light.css"; // Removed dependency
const inter = Inter({ subsets: ["latin"] });

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
      <head>
        <script src="/suppress-warnings.js" />
      </head>
      <body className={cn("dash-tail-app", inter.className)}>
        <WarningSuppressor />
        <BodyClassHandler />
        <TanstackProvider>
          <Providers>{children}</Providers>
        </TanstackProvider>
      </body>
    </html>
  );
}
