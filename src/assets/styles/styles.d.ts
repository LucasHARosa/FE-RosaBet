import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    text: {
      dynamic: {
        whiteDynamic: {
          100: string;
          80: string;
          64: string;
          40: string;
        };
        dynamicDisabled: string;
      };
      absolute: {
        whiteAbsolute: {
          100: string;
          24: string;
        };
        blackAbsolute: {
          100: string;
        };
      };
    };
    background: {
      dynamic: {
        blackDynamic: {
          100: string;
        };
        whiteDynamic: {
          4: string;
          8: string;
        };
      };
      absolute: {
        blackAbsolute: {
          100: string;
        };
        whiteAbsolute: {
          100: string;
          80: string;
          40: string;
          24: string;
          8: string;
          4: string;
        };
      };
    };
    border: {
      whiteDynamic: {
        8: string;
        40: string;
        16: string;
      };
    };
    brand: {
      primary: {
        100: string;
      };
      secondary: {
        100: string;
        24: string;
        accent: {
          green: {
            100: string;
            8: string;
          };
          textYellow: string;
          bgYellow: string;
        };
      };
    };
    misc: {
      blackDynamic: {
        40: string;
        24: string;
      };
      pageSecondary: string;
      modal:string;
    };
  }
}
