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
      title: "Chart",
      icon: ChartArea,
      megaMenu: [
        {
          title: "Apex Chart",
          icon: ChartBar,
          child: [
            {
              title: "Line",
              href: "/charts-appex-line",
              icon: "heroicons:information-circle",
            },
            {
              title: "Area",
              href: "/charts-appex-area",
              icon: "heroicons:information-circle",
            },
            {
              title: "Column",
              href: "/charts-appex-column",
              icon: "heroicons:information-circle",
            },
            {
              title: "Bar",
              href: "/charts-appex-bar",
              icon: "heroicons:information-circle",
            },
            {
              title: "Combo/Mixed",
              href: "/charts-appex-combo",
              icon: "heroicons:information-circle",
            },
            {
              title: "Range Area",
              href: "/charts-appex-range",
              icon: "heroicons:information-circle",
            },
            {
              title: "Timeline",
              href: "/charts-appex-timeline",
              icon: "heroicons:information-circle",
            },
            {
              title: "Funnel",
              href: "/charts-appex-funnel",
              icon: "heroicons:information-circle",
            },
            {
              title: "Candle Stick",
              href: "/charts-appex-candlestick",
              icon: "heroicons:information-circle",
            },
            {
              title: "Boxplot",
              href: "/charts-appex-boxplot",
              icon: "heroicons:information-circle",
            },
            {
              title: "Pie",
              href: "/charts-appex-pie",
              icon: "heroicons:information-circle",
            },
            {
              title: "Radar",
              href: "/charts-appex-radar",
              icon: "heroicons:information-circle",
            },
            {
              title: "Polar Area",
              href: "/charts-appex-polararea",
              icon: "heroicons:information-circle",
            },
            {
              title: "Radial Bars",
              href: "/charts-appex-radialbars",
              icon: "heroicons:information-circle",
            },
            {
              title: "Bubble",
              href: "/charts-appex-bubble",
              icon: "heroicons:information-circle",
            },
            {
              title: "Scatter",
              href: "/charts-appex-scatter",
              icon: "heroicons:information-circle",
            },
            {
              title: "Heatmap",
              href: "/charts-appex-heatmap",
              icon: "heroicons:information-circle",
            },
            {
              title: "Treemap",
              href: "/charts-appex-treemap",
              icon: "heroicons:information-circle",
            },
          ],
        },
        {
          title: "Re Chart",
          icon: PretentionChartLine,
          child: [
            {
              title: "Line",
              href: "/charts-rechart-line",
              icon: "heroicons:information-circle",
            },
            {
              title: "Area",
              href: "/charts-rechart-area",
              icon: "heroicons:information-circle",
            },
            {
              title: "Bar",
              href: "/charts-rechart-bar",
              icon: "heroicons:information-circle",
            },
            {
              title: "Scatter",
              href: "/charts-rechart-scatter",
              icon: "heroicons:information-circle",
            },
            {
              title: "Composed",
              href: "/charts-rechart-composed",
              icon: "heroicons:information-circle",
            },
            {
              title: "Pie",
              href: "/charts-rechart-pie",
              icon: "heroicons:information-circle",
            },
            {
              title: "Radar",
              href: "/charts-rechart-radar",
              icon: "heroicons:information-circle",
            },
            {
              title: "Radial Bar",
              href: "/charts-rechart-radialbar",
              icon: "heroicons:information-circle",
            },
            {
              title: "Tree Map",
              href: "/charts-rechart-treemap",
              icon: "heroicons:information-circle",
            },
          ],
        },
        {
          title: "chart js",
          icon: PretentionChartLine2,
          child: [
            {
              title: "Bar",
              href: "/charts-chartjs-bar",
              icon: "heroicons:information-circle",
            },
            {
              title: "Line",
              href: "/charts-chartjs-line",
              icon: "heroicons:information-circle",
            },
            {
              title: "Area",
              href: "/charts-chartjs-area",
              icon: "heroicons:information-circle",
            },
            {
              title: "Other",
              href: "/charts-chartjs-other",
              icon: "heroicons:information-circle",
            },
            {
              title: "Scales",
              href: "/charts-chartjs-scales",
              icon: "heroicons:information-circle",
            },
            {
              title: "Scale Options",
              href: "/charts-chartjs-scaleoptions",
              icon: "heroicons:information-circle",
            },
            {
              title: "Legend",
              href: "/charts-chartjs-legend",
              icon: "heroicons:information-circle",
            },
            {
              title: "Title",
              href: "/charts-chartjs-title",
              icon: "heroicons:information-circle",
            },
            {
              title: "Subtitle",
              href: "/charts-chartjs-subtitle",
              icon: "heroicons:information-circle",
            },
            {
              title: "Tooltip",
              href: "/charts-chartjs-tooltip",
              icon: "heroicons:information-circle",
            },
            {
              title: "Scriptable Options",
              href: "/charts-chartjs-scriptable",
              icon: "heroicons:information-circle",
            },
            {
              title: "Animations",
              href: "/charts-chartjs-animations",
              icon: "heroicons:information-circle",
            },
          ],
        },
        {
          title: "unovis",
          icon: PretentionChartLine,
          child: [
            {
              title: "Line",
              href: "/charts-unovis-line",
              icon: "heroicons:information-circle",
            },
            {
              title: "Bar",
              href: "/charts-unovis-bar",
              icon: "heroicons:information-circle",
            },
            {
              title: "Area",
              href: "/charts-unovis-area",
              icon: "heroicons:information-circle",
            },
            {
              title: "Scatter",
              href: "/charts-unovis-scatter",
              icon: "heroicons:information-circle",
            },
          ],
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
        title: "Chart",
        icon: ChartArea,
        child: [
          {
            title: "Apex Chart",
            icon: ChartBar,
            nested: [
              {
                title: "Line",
                href: "/charts-appex-line",
                icon: "heroicons:information-circle",
              },
              {
                title: "Area",
                href: "/charts-appex-area",
                icon: "heroicons:information-circle",
              },
              {
                title: "Column",
                href: "/charts-appex-column",
                icon: "heroicons:information-circle",
              },
              {
                title: "Bar",
                href: "/charts-appex-bar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Combo/Mixed",
                href: "/charts-appex-combo",
                icon: "heroicons:information-circle",
              },
              {
                title: "Range Area",
                href: "/charts-appex-range",
                icon: "heroicons:information-circle",
              },
              {
                title: "Timeline",
                href: "/charts-appex-timeline",
                icon: "heroicons:information-circle",
              },
              {
                title: "Funnel",
                href: "/charts-appex-funnel",
                icon: "heroicons:information-circle",
              },
              {
                title: "Candle Stick",
                href: "/charts-appex-candlestick",
                icon: "heroicons:information-circle",
              },
              {
                title: "Boxplot",
                href: "/charts-appex-boxplot",
                icon: "heroicons:information-circle",
              },
              {
                title: "Pie",
                href: "/charts-appex-pie",
                icon: "heroicons:information-circle",
              },
              {
                title: "Radar",
                href: "/charts-appex-radar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Polar Area",
                href: "/charts-appex-polararea",
                icon: "heroicons:information-circle",
              },
              {
                title: "Radial Bars",
                href: "/charts-appex-radialbars",
                icon: "heroicons:information-circle",
              },
              {
                title: "Bubble",
                href: "/charts-appex-bubble",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scatter",
                href: "/charts-appex-scatter",
                icon: "heroicons:information-circle",
              },
              {
                title: "Heatmap",
                href: "/charts-appex-heatmap",
                icon: "heroicons:information-circle",
              },
              {
                title: "Treemap",
                href: "/charts-appex-treemap",
                icon: "heroicons:information-circle",
              },
            ],
          },
          {
            title: "Re Chart",
            icon: PretentionChartLine,
            nested: [
              {
                title: "Line",
                href: "/charts-rechart-line",
                icon: "heroicons:information-circle",
              },
              {
                title: "Area",
                href: "/charts-rechart-area",
                icon: "heroicons:information-circle",
              },
              {
                title: "Bar",
                href: "/charts-rechart-bar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scatter",
                href: "/charts-rechart-scatter",
                icon: "heroicons:information-circle",
              },
              {
                title: "Composed",
                href: "/charts-rechart-composed",
                icon: "heroicons:information-circle",
              },
              {
                title: "Pie",
                href: "/charts-rechart-pie",
                icon: "heroicons:information-circle",
              },
              {
                title: "Radar",
                href: "/charts-rechart-radar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Radial Bar",
                href: "/charts-rechart-radialbar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Tree Map",
                href: "/charts-rechart-treemap",
                icon: "heroicons:information-circle",
              },
            ],
          },
          {
            title: "chart js",
            icon: PretentionChartLine2,
            nested: [
              {
                title: "Bar",
                href: "/charts-chartjs-bar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Line",
                href: "/charts-chartjs-line",
                icon: "heroicons:information-circle",
              },
              {
                title: "Area",
                href: "/charts-chartjs-area",
                icon: "heroicons:information-circle",
              },
              {
                title: "Other",
                href: "/charts-chartjs-other",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scales",
                href: "/charts-chartjs-scales",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scale Options",
                href: "/charts-chartjs-scaleoptions",
                icon: "heroicons:information-circle",
              },
              {
                title: "Legend",
                href: "/charts-chartjs-legend",
                icon: "heroicons:information-circle",
              },
              {
                title: "Title",
                href: "/charts-chartjs-title",
                icon: "heroicons:information-circle",
              },
              {
                title: "Subtitle",
                href: "/charts-chartjs-subtitle",
                icon: "heroicons:information-circle",
              },
              {
                title: "Tooltip",
                href: "/charts-chartjs-tooltip",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scriptable Options",
                href: "/charts-chartjs-scriptable",
                icon: "heroicons:information-circle",
              },
              {
                title: "Animations",
                href: "/charts-chartjs-animations",
                icon: "heroicons:information-circle",
              },
            ],
          },
          {
            title: "unovis",
            icon: PretentionChartLine,
            nested: [
              {
                title: "Line",
                href: "/charts-unovis-line",
                icon: "heroicons:information-circle",
              },
              {
                title: "Bar",
                href: "/charts-unovis-bar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Area",
                href: "/charts-unovis-area",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scatter",
                href: "/charts-unovis-scatter",
                icon: "heroicons:information-circle",
              },
            ],
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
        title: "Chart",
        icon: ChartArea,
        child: [
          {
            title: "Apex Chart",
            icon: ChartBar,
            multi_menu: [
              {
                title: "Line",
                href: "/charts-appex-line",
                icon: "heroicons:information-circle",
              },
              {
                title: "Area",
                href: "/charts-appex-area",
                icon: "heroicons:information-circle",
              },
              {
                title: "Column",
                href: "/charts-appex-column",
                icon: "heroicons:information-circle",
              },
              {
                title: "Bar",
                href: "/charts-appex-bar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Combo/Mixed",
                href: "/charts-appex-combo",
                icon: "heroicons:information-circle",
              },
              {
                title: "Range Area",
                href: "/charts-appex-range",
                icon: "heroicons:information-circle",
              },
              {
                title: "Timeline",
                href: "/charts-appex-timeline",
                icon: "heroicons:information-circle",
              },
              {
                title: "Funnel",
                href: "/charts-appex-funnel",
                icon: "heroicons:information-circle",
              },
              {
                title: "Candle Stick",
                href: "/charts-appex-candlestick",
                icon: "heroicons:information-circle",
              },
              {
                title: "Boxplot",
                href: "/charts-appex-boxplot",
                icon: "heroicons:information-circle",
              },
              {
                title: "Pie",
                href: "/charts-appex-pie",
                icon: "heroicons:information-circle",
              },
              {
                title: "Radar",
                href: "/charts-appex-radar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Polar Area",
                href: "/charts-appex-polararea",
                icon: "heroicons:information-circle",
              },
              {
                title: "Radial Bars",
                href: "/charts-appex-radialbars",
                icon: "heroicons:information-circle",
              },
              {
                title: "Bubble",
                href: "/charts-appex-bubble",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scatter",
                href: "/charts-appex-scatter",
                icon: "heroicons:information-circle",
              },
              {
                title: "Heatmap",
                href: "/charts-appex-heatmap",
                icon: "heroicons:information-circle",
              },
              {
                title: "Treemap",
                href: "/charts-appex-treemap",
                icon: "heroicons:information-circle",
              },
            ],
          },
          {
            title: "Re Chart",
            icon: PretentionChartLine,
            multi_menu: [
              {
                title: "Line",
                href: "/charts-rechart-line",
                icon: "heroicons:information-circle",
              },
              {
                title: "Area",
                href: "/charts-rechart-area",
                icon: "heroicons:information-circle",
              },
              {
                title: "Bar",
                href: "/charts-rechart-bar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scatter",
                href: "/charts-rechart-scatter",
                icon: "heroicons:information-circle",
              },
              {
                title: "Composed",
                href: "/charts-rechart-composed",
                icon: "heroicons:information-circle",
              },
              {
                title: "Pie",
                href: "/charts-rechart-pie",
                icon: "heroicons:information-circle",
              },
              {
                title: "Radar",
                href: "/charts-rechart-radar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Radial Bar",
                href: "/charts-rechart-radialbar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Tree Map",
                href: "/charts-rechart-treemap",
                icon: "heroicons:information-circle",
              },
            ],
          },
          {
            title: "Chart js",
            icon: PretentionChartLine2,
            multi_menu: [
              {
                title: "Bar",
                href: "/charts-chartjs-bar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Line",
                href: "/charts-chartjs-line",
                icon: "heroicons:information-circle",
              },
              {
                title: "Area",
                href: "/charts-chartjs-area",
                icon: "heroicons:information-circle",
              },
              {
                title: "Other",
                href: "/charts-chartjs-other",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scales",
                href: "/charts-chartjs-scales",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scale Options",
                href: "/charts-chartjs-scaleoptions",
                icon: "heroicons:information-circle",
              },
              {
                title: "Legend",
                href: "/charts-chartjs-legend",
                icon: "heroicons:information-circle",
              },
              {
                title: "Title",
                href: "/charts-chartjs-title",
                icon: "heroicons:information-circle",
              },
              {
                title: "Subtitle",
                href: "/charts-chartjs-subtitle",
                icon: "heroicons:information-circle",
              },
              {
                title: "Tooltip",
                href: "/charts-chartjs-tooltip",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scriptable Options",
                href: "/charts-chartjs-scriptable",
                icon: "heroicons:information-circle",
              },
              {
                title: "Animations",
                href: "/charts-chartjs-animations",
                icon: "heroicons:information-circle",
              },
            ],
          },
          {
            title: "Unovis",
            icon: PretentionChartLine,
            multi_menu: [
              {
                title: "Line",
                href: "/charts-unovis-line",
                icon: "heroicons:information-circle",
              },
              {
                title: "Bar",
                href: "/charts-unovis-bar",
                icon: "heroicons:information-circle",
              },
              {
                title: "Area",
                href: "/charts-unovis-area",
                icon: "heroicons:information-circle",
              },
              {
                title: "Scatter",
                href: "/charts-unovis-scatter",
                icon: "heroicons:information-circle",
              },
            ],
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



