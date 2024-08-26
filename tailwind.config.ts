import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {},
		screens: {
			sm: '400px',
			md: '650px',
			lg: '1000px',
			xl: '1400px',
		},
		container: {
			center: true,
		},
	},
	darkMode: "class",
	plugins: [nextui()]
};
export default config;
