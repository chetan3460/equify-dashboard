import { LayoutDashboard, LineChart } from "lucide-react";

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      child: [
        { title: "Dashboard V2", href: "/dashboard-v2", icon: LineChart },
        { title: "Interactive", href: "/dashboard-v2/interactive", icon: LineChart },
        { title: "Guides", href: "/dashboard-v2/guides", icon: LineChart },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        child: [
          { title: "Dashboard V2", href: "/dashboard-v2", icon: LineChart },
          { title: "Interactive", href: "/dashboard-v2/interactive", icon: LineChart },
          { title: "Guides", href: "/dashboard-v2/guides", icon: LineChart },
        ],
      },
    ],
    classic: [
      { isHeader: true, title: "menu" },
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard-v2",
        isOpen: false,
        isHide: false,
        child: [
          { title: "Dashboard V2", href: "/dashboard-v2", icon: LineChart },
          { title: "Interactive", href: "/dashboard-v2/interactive", icon: LineChart },
          { title: "Guides", href: "/dashboard-v2/guides", icon: LineChart },
        ],
      },
    ],
  },
};

