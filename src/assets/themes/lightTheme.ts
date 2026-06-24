import { DefaultTheme } from "styled-components";

export default {
  text: {
    dynamic: {
      whiteDynamic: {
        "100": "rgba(10, 10, 10, 0.8)",
        "80": "rgba(10, 10, 10, 0.64)",
        "64": "rgba(10, 10, 10, 0.64)",
        "40": "rgba(0, 0, 0, 0.48)",
      },
      dynamicDisabled: "rgba(0, 0, 0, 0.24)",
    },
    absolute: {
      whiteAbsolute: {
        "100": "rgba(255, 255, 255, 1)",
        "24": "rgba(255, 255, 255, 0.24)",
      },
      blackAbsolute: {
        "100": "#0A0A0A",
      },
    },
  },
  background: {
    dynamic: {
      blackDynamic: {
        "100": "rgba(255, 255, 255, 1)",
      },
      whiteDynamic: {
        "4": "rgba(0, 0, 0, 0.04)",
        "8": "rgba(0, 0, 0, 0.08)",
      },
    },
    absolute: {
      blackAbsolute: {
        "100": "#0A0A0A",
      },
      whiteAbsolute: {
        "100": "rgba(255, 255, 255, 1)",
        "80": "rgba(255, 255, 255, 0.80)",
        "40": "rgba(255, 255, 255, 0.40)",
        "24": "rgba(255, 255, 255, 0.24)",
        "8": "rgba(255, 255, 255, 0.08)",
        "4": "rgba(255, 255, 255, 0.04)",
      },
    },
  },
  border: {
    whiteDynamic: {
      "8": "rgba(0, 0, 0, 0.08)",
      "16": "rgba(0, 0, 0, 0.16)",
      "40": "rgba(0, 0, 0, 0.40)",
    },
  },
  brand: {
    primary: {
      "100": "#FFB5C0",
    },
    secondary: {
      "100": "#E30B5D",
      "24": "#E30B5D24",
      accent: {
        green: {
          "100": "#56B212",
          "8": "#56B21208",
        },
        textYellow: "#E57300",
        bgYellow: "#FF7F0016",
      },
    },
  },
  misc: {
    blackDynamic: {
      "40": "rgba(255, 255, 255, 0.40)",
      "24": "rgba(255, 255, 255, 0.24)",
    },
    pageSecondary: "#F5F5F5",
    modal: "rgba(245, 245, 245, 1)",
  },
} as DefaultTheme;
