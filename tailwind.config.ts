import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      jet: "#1B1D1F",
      bunker: "#282B30",
      white: "#FFFFFF",
      "dodger-blue": "#4E80EE",
      "shuttle-gray": "#6C727F",
      "light-grayish-blue": "#D2D5DA",
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/hero-image-wr.jpg')",
        "custom-checkbox": "url('/Done_round.svg')",
        "expand-down": "url('/Expand_down.svg')",
      },
      backgroundPosition: {
        "right-10-center": "right 10px center",
      },
      boxShadow: {
        box: "0 0 2px 1px rgba(255, 255, 255, 0.5)",
      }
    },
  },
  plugins: [],
};
export default config;
