import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('_assets/img/hero-bg.webp')",
        'c-bg-img-1': "url('_assets/img/c-bg-img-1.webp')",
        'c-bg-img-2': "url('_assets/img/c-bg-img-2.webp')",
        'c-bg-img-3': "url('_assets/img/c-bg-img-3.webp')",
        'footer-top-bg': "url('_assets/img/footer-top-bg.webp')",
      },
      colors: {
        "light-green": "rgba(52, 168, 83, 0.06)",
        green: "#34a853",
        "green-200": "rgba(52, 168, 83, 0.2)",
        orange: "#ffbb38",
        red: "#fe0600",
        purple: "#921dff",
      },
      container: {
        center: true
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "icon-xs": "6px" 
      }
    },
  },
  plugins: [],
};
export default config;
