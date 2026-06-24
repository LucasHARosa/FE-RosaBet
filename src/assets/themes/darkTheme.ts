import { DefaultTheme } from "styled-components";

export default {
  text: {
    dynamic: {
      whiteDynamic: {
        "100": "rgba(255, 255, 255, 1)",
        "80": "rgba(255, 255, 255, 0.8)",
        "64": "rgba(255, 255, 255, 0.64)",
        "40": "rgba(255, 255, 255, 0.40)",
      },
      dynamicDisabled: "rgba(255, 255, 255, 0.32)",
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
        "100": "#0A0A0A",
      },
      whiteDynamic: {
        "4": "rgba(255, 255, 255, 0.04)",
        "8": "rgba(255, 255, 255, 0.08)",
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
      "8": "rgba(255, 255, 255, 0.08)",
      "16": "rgba(255, 255, 255, 0.16)",
      "40": "rgba(255, 255, 255, 0.40)",
    },
  },
  brand: {
    primary: {
      "100": "#E30B5D",
    },
    secondary: {
      "100": "#FF6B9D",
      "24": "#E30B5D24",
      accent: {
        green: {
          "100": "#A7FF66",
          "8": "#A7FF6608",
        },
        textYellow: "#FFF27E",
        bgYellow: "#FFF27E16",
      },
    },
  },
  misc: {
    blackDynamic: {
      "40": "rgba(0, 0, 0, 0.40)",
      "24": "rgba(0, 0, 0, 0.24)",
    },
    pageSecondary: "rgba(255, 255, 255, 0.04)",
    modal: "rgba(20, 20, 20, 1)",
  },
} as DefaultTheme;


// text.dynamic.whiteDynamic.100
// text.dynamic.whiteDynamic.80
// text.dynamic.whiteDynamic.64
// text.dynamic.whiteDynamic.40
// text.dynamic.dynamicDisabled
// text.absolute.whiteAbsolute.100
// text.absolute.whiteAbsolute.24
// text.absolute.blackAbsolute.100
// background.dynamic.blackDynamic.100
// background.dynamic.whiteDynamic.4
// background.dynamic.whiteDynamic.8
// background.absolute.blackAbsolute.100
// background.absolute.whiteAbsolute.100
// background.absolute.whiteAbsolute.80
// background.absolute.whiteAbsolute.40
// background.absolute.whiteAbsolute.24
// background.absolute.whiteAbsolute.8
// background.absolute.whiteAbsolute.4
// border.whiteDynamic.8
// border.whiteDynamic.16
// border.whiteDynamic.40
// brand.primary.100
// brand.secondary.100
// brand.secondary.24
// brand.secondary.accent.green.100
// brand.secondary.accent.green.8
// brand.secondary.accent.textYellow
// brand.secondary.accent.bgYellow
// misc.blackDynamic.40
// misc.blackDynamic.24
// misc.pageSecondary
// misc.modal
