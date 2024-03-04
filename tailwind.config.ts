import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'slow': 'spin 2s linear infinite',
      },
      boxShadow: {
        "tab": "rgba(16, 24, 40, 0.1) 0px 1px 3px, rgba(16, 24, 40, 0.06) 0px 1px 2px"
      },
      fontFamily: {
        "libre": "LibreFranklin-R",
        "libre-m": "LibreFranklin-M",
        "libre-sb": "LibreFranklin-SB",
        "libre-b": "LibreFranklin-B"
      },
      colors: {
        "primary-gold": "#f99f1b",
        "primary-charcol": "#3a3c3e",
        "primary-blue": "#0085ab",
        "secondary-gold": "#ffc60a",
        "secondary-blue": "#87d6f6",

      },
      backgroundImage: {
        "logo": "url('/ndg_MuseLab_Primary Logo_Gold _ 300px.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
