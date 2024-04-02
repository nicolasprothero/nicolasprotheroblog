import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sometype': ["Sometype Mono", 'monospace'],
      },
      height: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
