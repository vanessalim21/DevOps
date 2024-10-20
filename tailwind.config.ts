import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lamaSky: "#ccdbfd",
        lamaSkyLight: "#e0fbfc",
        lamaPurple: "#0081a7",
        lamaPurpleLight: "#d7e3fc",
        lamaYellow: "#edc531",
        lamaYellowLight: "#ffd7ba",
      },
    },
  },
  plugins: [],
};
export default config;
