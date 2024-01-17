import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "450px",
    },
    extend: {
      boxShadow: {
        "right-md": "6px 3px 5px -5px #888;",
      },
      textShadow: {
        text8: `
          0.05em 0 black,
          0 0.05em black,
          -0.05em 0 black,
          0 -0.05em black,
          -0.05em -0.05em black,
          -0.05em 0.05em black,
          0.05em -0.05em black,
          0.05em 0.05em black;
       `,
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
} satisfies Config;
