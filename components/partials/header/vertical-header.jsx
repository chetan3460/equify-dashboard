import React from "react";
import { useSidebar, useThemeStore } from "@/store";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";

// Inline SVG component to avoid import issues
const SiteLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3868_4519)">
      <path d="M0 18.3826C0 16.8785 1.19391 15.6592 2.66667 15.6592H18V17.7017C18 19.2058 16.8061 20.4251 15.3333 20.4251H0V18.3826Z" fill="currentColor"/>
      <path d="M9.33329 32.0001C7.86056 32.0001 6.66663 30.7807 6.66663 29.2767V21.1064H8.66663C10.1394 21.1064 11.3333 22.3258 11.3333 23.8298V32.0001H9.33329Z" fill="currentColor"/>
      <path d="M0 0H18.6667C26.0305 0 32 6.09655 32 13.617H0V0Z" fill="currentColor"/>
      <path d="M16 31.9996C18.1011 31.9996 20.1817 31.5769 22.1229 30.7558C24.0641 29.9346 25.828 28.731 27.3137 27.2136C28.7995 25.6963 29.978 23.8949 30.7821 21.9124C31.5861 19.9299 32 17.805 32 15.6592H22.8411C22.8411 16.5767 22.6641 17.4852 22.3203 18.3329C21.9765 19.1805 21.4727 19.9507 20.8374 20.5995C20.2021 21.2483 19.448 21.7629 18.618 22.114C17.788 22.4651 16.8984 22.6458 16 22.6458V31.9996Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_3868_4519">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const MenuBar = ({ collapsed, setCollapsed }) => {
  return (
    <button
      className="relative group  disabled:cursor-not-allowed opacity-50"
      onClick={() => setCollapsed(!collapsed)}
    >
      <div>
        <div
          className={cn(
            "flex flex-col justify-between w-[20px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden",
            {
              "-translate-x-1.5 rotate-180": collapsed,
            }
          )}
        >
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "rotate-[42deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] w-7 rounded transform transition-all duration-300",
              {
                "translate-x-10": collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "-rotate-[43deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

const VerticalHeader = ({ handleOpenSearch }) => {
  const { collapsed, setCollapsed, subMenu, sidebarType } = useSidebar();
  const { layout } = useThemeStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isMobile = useMediaQuery("(min-width: 768px)");
  let LogoContent = null;
  let menuBarContent = null;
  let searchButtonContent = null;

  const MainLogo = (
    <Link href="/dashboard" className=" text-primary ">
      <SiteLogo className="h-7 w-7" />
    </Link>
  );
  const SearchButton = (
    <div>
      <button
        className=" inline-flex  gap-2 items-center text-default-600 text-sm"
        onClick={handleOpenSearch}
      >
        <span>
          <Search className=" h-4 w-4" />
        </span>
        <span className=" md:block hidden"> Search...</span>
      </button>
    </div>
  );
  if (layout === "semibox" && !isDesktop) {
    LogoContent = MainLogo;
  }
  if (layout === "vertical" && !isDesktop) {
    LogoContent = MainLogo;
  }

  // menu bar content condition
  if (isDesktop) {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  if (sidebarType === "classic") {
    menuBarContent = null;
  }
  if (subMenu && isDesktop) {
    menuBarContent = null;
  }
  // Show search button for classic sidebar
  searchButtonContent = SearchButton;
  return (
    <>
      <div className="flex items-center md:gap-6 gap-3">
        {LogoContent}
        {menuBarContent}
        {searchButtonContent}
      </div>
    </>
  );
};

export default VerticalHeader;
