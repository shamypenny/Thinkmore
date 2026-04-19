import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16202A",
        mist: "#EEF3F7",
        sky: "#D7E9F8",
        lake: "#3A7CA5",
        mint: "#B9E3C6",
        coral: "#F28C6B",
        gold: "#E9B949"
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(22, 32, 42, 0.35)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(58,124,165,0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(185,227,198,0.28), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;
