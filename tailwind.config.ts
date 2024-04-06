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
      "dodger-blue": "#4E80EE",
      "shuttle-gray": "#6C727F",
      "light-grayish-blue": "#D2D5DA",
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/hero-image-wr.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
