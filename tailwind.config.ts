import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "right-md": "6px 3px 5px -5px #888;",
      },
    },
  },
  plugins: [],
} satisfies Config;
