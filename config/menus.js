import { DashBoard, Graph } from "@/components/svg";

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      child: [
        { title: "Dashboard V2", href: "/dashboard-v2", icon: Graph },
        { title: "Interactive", href: "/dashboard-v2/interactive", icon: Graph },
        { title: "Guides", href: "/dashboard-v2/guides", icon: Graph },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        child: [
          { title: "Dashboard V2", href: "/dashboard-v2", icon: Graph },
          { title: "Interactive", href: "/dashboard-v2/interactive", icon: Graph },
          { title: "Guides", href: "/dashboard-v2/guides", icon: Graph },
        ],
      },
    ],
    classic: [
      { isHeader: true, title: "menu" },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard-v2",
        isOpen: false,
        isHide: false,
        child: [
          { title: "Dashboard V2", href: "/dashboard-v2", icon: Graph },
          { title: "Interactive", href: "/dashboard-v2/interactive", icon: Graph },
          { title: "Guides", href: "/dashboard-v2/guides", icon: Graph },
        ],
      },
    ],
  },
};



