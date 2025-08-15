import { create } from "zustand";
import { siteConfig } from "@/config/site";
import { persist, createJSONStorage } from "zustand/middleware";
export const useThemeStore = create(
  (set) => ({
    theme: "custom", // hardcoded to custom theme
    layout: "vertical", // hardcoded to vertical
    navbarType: "sticky", // hardcoded to sticky
    footerType: "static", // hardcoded to static
    radius: 1.25, // hardcoded to 20px (1.25rem)
  })
);

export const useSidebar = create(
  persist(
    (set) => ({
      collapsed: false,
      setCollapsed: (value) => set({ collapsed: value }),
      sidebarType: "classic", // Always use classic sidebar
      setSidebarType: (value) => {
        set({ sidebarType: value });
      },
      subMenu: false,
      setSubmenu: (value) => set({ subMenu: value }),
      // background image
      sidebarBg: siteConfig.sidebarBg,
      setSidebarBg: (value) => set({ sidebarBg: value }),
      mobileMenu: false,
      setMobileMenu: (value) => set({ mobileMenu: value }),
    }),
    {
      name: "sidebar-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
