import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      theme: {
        screens: {
          tablet: "600px",
          laptop: "900px",
          desktop: "1536px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
