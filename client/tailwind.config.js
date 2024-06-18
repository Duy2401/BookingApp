/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        backgroud: "#003b95",
        bgHover: "#1a4fa0",
        btnSearch: "#006ce4",
      },
      flex: {
        flex25: "0 0 25%",
        flex30: "0 0 30%",
      },
      width: {
        w_10: "calc(100% - 10px)",
      },
      maxWidth: {
        mw_11: "1100px",
      },
      padding: {
        p_9_24: "9px 24px",
      },
      translate: {
        trans_x: "-50%",
        trans_y: "-30px",
      },
    },
  },
  plugins: [],
};
