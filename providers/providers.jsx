"use client";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { ReactToaster } from "@/components/ui/toaster";
import { Toaster } from "react-hot-toast";
import { SonnToaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

const Providers = ({ children }) => {
  const location = usePathname();

  if (location === "/") {
    return (
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <div className={cn("h-full")}>
          {children}
          <ReactToaster />
        </div>
        <Toaster />
        <SonnToaster />
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
    >
      <div className={cn("h-full")}>
        {children}
        <ReactToaster />
      </div>
      <Toaster />
      <SonnToaster />
    </ThemeProvider>
  );
};

export default Providers;
