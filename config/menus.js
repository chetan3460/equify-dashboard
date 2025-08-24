import {
  Application,
  Chart,
  Components,
  DashBoard,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Icons,
  ChartArea,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
} from "@/components/svg";

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      child: [
        {
          title: "Analytics",
          href: "/dashboard",
          icon: Graph,
        },
        {
          title: "Dashboard V2",
          href: "/dashboard-v2",
          icon: Graph,
        },
        {
          title: "Ecommerce",
          href: "/ecommerce",
          icon: Cart,
        },
        {
          title: "Project ",
          href: "/project",
          icon: ClipBoard,
        },
      ],
    },
    {
      title: "Components",
      icon: Components,
      megaMenu: [
        {
          title: "Base Ui",
          icon: Flag,
          child: [
            {
              title: "accordion",
              icon: "heroicons:information-circle",
              href: "/accordion",
            },
            {
              title: "alert",
              icon: "heroicons:information-circle",
              href: "/alert",
            },
            {
              title: "avatar",
              icon: "heroicons:information-circle",
              href: "/avatar",
            },
            {
              title: "badge",
              icon: "heroicons:cube",
              href: "/badge",
            },
            {
              title: "breadcrumb",
              icon: "heroicons:cube",
              href: "/breadcrumb",
            },
            {
              title: "Button",
              icon: "heroicons:cube",
              href: "/button",
            },

            {
              title: "Card",
              icon: "heroicons:cube",
              href: "/card",
            },
            {
              title: "carousel",
              icon: "heroicons:information-circle",
              href: "/carousel",
            },
            {
              title: "color",
              icon: "heroicons:information-circle",
              href: "/color",
            },
            {
              title: "combobox",
              icon: "heroicons:cube",
              href: "/combobox",
            },
            {
              title: "command",
              icon: "heroicons:cube",
              href: "/command",
            },
            {
              title: "Dropdown",
              icon: "heroicons:cube",
              href: "/dropdown",
            },
            {
              title: "Dialog",
              icon: "heroicons:cube",
              href: "/dialog",
            },
            {
              title: "kbd",
              icon: "heroicons:information-circle",
              href: "/kbd",
            },
            {
              title: "pagination",
              icon: "heroicons:cube",
              href: "/pagination",
            },
            {
              title: "popover",
              icon: "heroicons:information-circle",
              href: "/popover",
            },
            {
              title: "progress",
              icon: "heroicons:information-circle",
              href: "/progress",
            },
            {
              title: "sheet",
              icon: "heroicons:cube",
              href: "/sheet",
            },
            {
              title: "skeleton",
              icon: "heroicons:cube",
              href: "/skeleton",
            },
            {
              title: "tabs",
              icon: "heroicons:cube",
              href: "/tabs",
            },
            {
              title: "toast",
              icon: "heroicons:information-circle",
              href: "/toast",
            },
            {
              title: "tooltip",
              icon: "heroicons:information-circle",
              href: "/tooltip",
            },
            {
              title: "typography",
              icon: "heroicons:information-circle",
              href: "/typography",
            },
          ],
        },
      ],
    },

    {
      title: "Tables",
      icon: Grid,
      child: [
        {
          title: "Simple Table",
          href: "/simple-table",
          icon: BarLeft,
        },
        {
          title: "tailwindui table",
          href: "/tailwindui-table",
          icon: BarLeft,
        },
        {
          title: "Data Table",
          href: "/data-table",
          icon: BarTop,
        },
      ],
    },
    {
      title: "Icons",
      icon: Icons,
      child: [
        {
          title: "Hero Icons",
          icon: Heroicon,
          href: "/icons-iconify",
        },
        {
          title: "Lucide Icons",
          icon: LucideIcon,
          href: "/icons-lucide",
        },
        {
          title: "Custom Icons",
          icon: CustomIcon,
          href: "/icons-custom",
        },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        child: [
          {
            title: "Analytics",
            href: "/dashboard",
            icon: Graph,
          },
          {
            title: "Dashboard V2",
            href: "/dashboard-v2",
            icon: Graph,
          },
          {
            title: "Ecommerce",
            href: "/ecommerce",
            icon: Cart,
          },
          {
            title: "Project ",
            href: "/project",
            icon: ClipBoard,
          },
        ],
      },
      {
        title: "Components",
        icon: Components,
        child: [
          {
            title: "Base Ui",
            icon: Flag,
            nested: [
              {
                title: "accordion",
                icon: "heroicons:information-circle",
                href: "/accordion",
              },
              {
                title: "alert",
                icon: "heroicons:information-circle",
                href: "/alert",
              },
              {
                title: "avatar",
                icon: "heroicons:information-circle",
                href: "/avatar",
              },
              {
                title: "badge",
                icon: "heroicons:cube",
                href: "/badge",
              },
              {
                title: "breadcrumb",
                icon: "heroicons:cube",
                href: "/breadcrumb",
              },
              {
                title: "Button",
                icon: "heroicons:cube",
                href: "/button",
              },
              {
                title: "Card",
                icon: "heroicons:cube",
                href: "/card",
              },
              {
                title: "carousel",
                icon: "heroicons:information-circle",
                href: "/carousel",
              },
              {
                title: "color",
                icon: "heroicons:information-circle",
                href: "/color",
              },
              {
                title: "combobox",
                icon: "heroicons:cube",
                href: "/combobox",
              },
              {
                title: "command",
                icon: "heroicons:cube",
                href: "/command",
              },
              {
                title: "Dropdown",
                icon: "heroicons:cube",
                href: "/dropdown",
              },
              {
                title: "Dialog",
                icon: "heroicons:cube",
                href: "/dialog",
              },
              {
                title: "kbd",
                icon: "heroicons:information-circle",
                href: "/kbd",
              },
              {
                title: "pagination",
                icon: "heroicons:cube",
                href: "/pagination",
              },
              {
                title: "popover",
                icon: "heroicons:information-circle",
                href: "/popover",
              },
              {
                title: "progress",
                icon: "heroicons:information-circle",
                href: "/progress",
              },
              {
                title: "sheet",
                icon: "heroicons:cube",
                href: "/sheet",
              },
              {
                title: "skeleton",
                icon: "heroicons:cube",
                href: "/skeleton",
              },
              {
                title: "tabs",
                icon: "heroicons:cube",
                href: "/tabs",
              },
              {
                title: "toast",
                icon: "heroicons:information-circle",
                href: "/toast",
              },
              {
                title: "tooltip",
                icon: "heroicons:information-circle",
                href: "/tooltip",
              },
              {
                title: "typography",
                icon: "heroicons:information-circle",
                href: "/typography",
              },
            ],
          },
        ],
      },
      {
        title: "Tables",
        icon: Grid,
        child: [
          {
            title: "Simple Table",
            href: "/simple-table",
            icon: BarLeft,
          },
          {
            title: "tailwindui table",
            href: "/tailwindui-table",
            icon: BarLeft,
          },
          {
            title: "Data Table",
            href: "/data-table",
            icon: BarTop,
          },
        ],
      },
      {
        title: "Icons",
        icon: Icons,
        child: [
          {
            title: "Hero Icons",
            icon: Heroicon,
            href: "/icons-iconify",
          },
          {
            title: "Lucide Icons",
            icon: LucideIcon,
            href: "/icons-lucide",
          },
          {
            title: "Custom Icons",
            icon: CustomIcon,
            href: "/icons-custom",
          },
        ],
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
        isOpen: false,
        isHide: false,
        child: [
          {
            title: "Analytics",
            href: "/dashboard",
            icon: Graph,
          },
          {
            title: "Dashboard V2",
            href: "/dashboard-v2",
            icon: Graph,
          },
          {
            title: "Ecommerce",
            href: "/ecommerce",
            icon: Cart,
          },
          {
            title: "Project ",
            href: "/project",
            icon: ClipBoard,
          },
        ],
      },

      {
        isHeader: true,
        title: "Elements",
      },
      {
        title: "Components",
        icon: Components,
        href: "#",
        child: [
          {
            title: "Base Ui",
            icon: Flag,
            multi_menu: [
              {
                title: "accordion",
                icon: "heroicons:information-circle",
                href: "/accordion",
              },
              {
                title: "alert",
                icon: "heroicons:information-circle",
                href: "/alert",
              },
              {
                title: "avatar",
                icon: "heroicons:information-circle",
                href: "/avatar",
              },
              {
                title: "badge",
                icon: "heroicons:cube",
                href: "/badge",
              },
              {
                title: "breadcrumb",
                icon: "heroicons:cube",
                href: "/breadcrumb",
              },
              {
                title: "Button",
                icon: "heroicons:cube",
                href: "/button",
              },
              {
                title: "Card",
                icon: "heroicons:cube",
                href: "/card",
              },
              {
                title: "carousel",
                icon: "heroicons:information-circle",
                href: "/carousel",
              },
              {
                title: "color",
                icon: "heroicons:information-circle",
                href: "/color",
              },
              {
                title: "combobox",
                icon: "heroicons:cube",
                href: "/combobox",
              },
              {
                title: "command",
                icon: "heroicons:cube",
                href: "/command",
              },
              {
                title: "Dropdown",
                icon: "heroicons:cube",
                href: "/dropdown",
              },
              {
                title: "Dialog",
                icon: "heroicons:cube",
                href: "/dialog",
              },
              {
                title: "kbd",
                icon: "heroicons:information-circle",
                href: "/kbd",
              },
              {
                title: "pagination",
                icon: "heroicons:cube",
                href: "/pagination",
              },
              {
                title: "popover",
                icon: "heroicons:information-circle",
                href: "/popover",
              },
              {
                title: "progress",
                icon: "heroicons:information-circle",
                href: "/progress",
              },
              {
                title: "sheet",
                icon: "heroicons:cube",
                href: "/sheet",
              },
              {
                title: "skeleton",
                icon: "heroicons:cube",
                href: "/skeleton",
              },
              {
                title: "tabs",
                icon: "heroicons:cube",
                href: "/tabs",
              },
              {
                title: "toast",
                icon: "heroicons:information-circle",
                href: "/toast",
              },
              {
                title: "tooltip",
                icon: "heroicons:information-circle",
                href: "/tooltip",
              },
              {
                title: "typography",
                icon: "heroicons:information-circle",
                href: "/typography",
              },
            ],
          },
        ],
      },
      {
        title: "Table",
        icon: Grid,
        child: [
          {
            title: "Simple Table",
            href: "/simple-table",
            icon: BarLeft,
          },
          {
            title: "tailwindui table",
            href: "/tailwindui-table",
            icon: BarLeft,
          },
          {
            title: "Data Table",
            href: "/data-table",
            icon: BarTop,
          },
        ],
      },
      {
        title: "Icons",
        icon: Icons,
        child: [
          {
            title: "Hero Icons",
            icon: Heroicon,
            href: "/icons-iconify",
          },
          {
            title: "Lucide Icons",
            icon: LucideIcon,
            href: "/icons-lucide",
          },
          {
            title: "Custom Icons",
            icon: CustomIcon,
            href: "/icons-custom",
          },
        ],
      },
    ],
  },
};



