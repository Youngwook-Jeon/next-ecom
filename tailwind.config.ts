import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extends: {},
  },
  plugins: [],
});
export default config;
