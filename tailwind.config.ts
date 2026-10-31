import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "#171411", cream: "#f7f3ed", gold: "#c9a66b" }, fontFamily: { sans: ["Arial", "sans-serif"] } } }, plugins: [] };
export default config;
