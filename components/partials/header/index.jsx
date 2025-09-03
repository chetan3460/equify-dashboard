"use client";
import React from "react";
import { cn } from "@/lib/utils";
import ThemeButton from "./theme-button";
import { useSidebar, useThemeStore } from "@/store";
import ProfileInfo from "./profile-info";
import VerticalHeader from "./vertical-header";
import NotificationMessage from "./notification-message";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileMenuHandler from "./mobile-menu-handler";
import Header from "./Header";
import FullScreen from "./full-screen";
import CustomizeButton from "./customize-button";

const NavTools = ({ isDesktop }) => (
  <div className="nav-tools flex items-center gap-2 md:gap-6">
    <CustomizeButton />
    <NotificationMessage />
    {isDesktop && <FullScreen />}
    <ThemeButton />
    <div className="pl-2">
      <ProfileInfo />
    </div>
    {!isDesktop && <MobileMenuHandler />}
  </div>
);

const MainHeader = ({ handleOpenSearch }) => {
  const { collapsed, sidebarType } = useSidebar();
  const { navbarType } = useThemeStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <Header
      className={cn({
        "xl:ml-[244px]": !collapsed,
        "xl:ml-[72px]": collapsed,
        "sticky top-0": navbarType === "sticky",
      })}
    >
      <div className="w-full bg-card md:px-6 px-[15px] py-3">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader
            sidebarType={sidebarType}
            handleOpenSearch={handleOpenSearch}
          />
          <NavTools isDesktop={isDesktop} />
        </div>
      </div>
    </Header>
  );
};

export default MainHeader;
