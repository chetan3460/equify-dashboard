
/**
 * SMSByDepartment chart configuration and gradients.
 * Kept local to the chart folder to scope concerns and mirror OverallSMSVolume.
 */

export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 384,
};

export const DEPT_GRADIENTS = [
  {
    id: "grad-marketing",
    svgDefinition:
      "radial-gradient(43.8% 43.8% at 106.45% 11.83%, #FF6A88 0%, #FF99AC 100%)",
    cssGradient:
      "radial-gradient(43.8% 43.8% at 106.45% 11.83%, #FF6A88 0%, #FF99AC 100%)",
    solid: "#FF6A88",
  },
  {
    id: "grad-support",
    svgDefinition: "linear-gradient(167deg, #FFE159 8.37%, #FBD217 67.24%)",
    cssGradient: "linear-gradient(167deg, #FFE159 8.37%, #FBD217 67.24%)",
    solid: "#FFE159",
  },
  {
    id: "grad-hr",
    svgDefinition: "linear-gradient(167deg, #A259FF 8.37%, #C084FC 67.24%)",
    cssGradient: "linear-gradient(167deg, #A259FF 8.37%, #C084FC 67.24%)",
    solid: "#A259FF",
  },
  {
    id: "grad-admin",
    svgDefinition: "linear-gradient(266deg, #42A5F5 3.87%, #00B4D8 54.38%)",
    cssGradient: "linear-gradient(266deg, #42A5F5 3.87%, #00B4D8 54.38%)",
    solid: "#42A5F5",
  },
  {
    id: "grad-credit",
    svgDefinition:
      "radial-gradient(83.28% 83.28% at 74.34% 33.13%, #FDBB2D 0%, #F77500 100%)",
    cssGradient:
      "radial-gradient(83.28% 83.28% at 74.34% 33.13%, #FDBB2D 0%, #F77500 100%)",
    solid: "#FDBB2D",
  },
  {
    id: "grad-loan",
    svgDefinition:
      "radial-gradient(121.35% 121.35% at 58.87% 77.15%, #3EECAC 0%, #42A5F5 100%)",
    cssGradient:
      "radial-gradient(121.35% 121.35% at 58.87% 77.15%, #3EECAC 0%, #42A5F5 100%)",
    solid: "#3EECAC",
  },
];

