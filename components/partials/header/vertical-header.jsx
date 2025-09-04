import React from "react";
import { useSidebar, useThemeStore } from "@/store";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";

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
    <Link href="/dashboard-v2" className=" text-primary ">
      <Image
        src="/images/logo/logo.svg"
        alt="Logo"
        width={100}
        height={28}
        className="h-6 md:h-7 w-auto"
        priority
      />
    </Link>
  );
  const SearchButton = (
    <div>
      <button
        className=" inline-flex  gap-2 items-center text-[#595B61] text-sm"
        onClick={handleOpenSearch}
      >
        <span>
          {/* <Search className=" h-4 w-4" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M7.33333 13.1667C10.2789 13.1667 12.6667 10.7789 12.6667 7.83333C12.6667 4.88781 10.2789 2.5 7.33333 2.5C4.38781 2.5 2 4.88781 2 7.83333C2 10.7789 4.38781 13.1667 7.33333 13.1667Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.0001 14.5L11.1001 11.6"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
