"use client";
import Image from "next/image";
import { Loader2 } from "lucide-react";

// SiteLogo component
const SiteLogo = ({ className }) => (
  <Image
    src="/images/logo/logo.svg" // path relative to /public
    alt="Logo"
    width={100}
    height={100}
    className={className} // will only control dimensions/spacing
    priority
  />
);

const LayoutLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col space-y-2">
      <SiteLogo />
      <span className="inline-flex gap-1 items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  );
};

export default LayoutLoader;
