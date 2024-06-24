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
        iconGrey: "#595959",
        btnText: "rgba(0,108,228,0.06);",
      },
      flex: {
        flex25: "0 0 25%",
        flex30: "0 0 30%",
      },
      width: {
        w_10: "calc(100% - 10px)",
        w_50: "calc(50% - 9px)",
      },
      maxWidth: {
        mw_11: "1100px",
      },
      minWidth: {
        mw_326: "326px",
        mw_430: "430px",
      },
      maxHeight: {
        mh_288: "288px",
      },
      padding: {
        p_9_24: "9px 24px",
      },
      translate: {
        trans_x: "-50%",
        trans_y: "-30px",
      },
      borderColor: {
        border_color_1: "#868686",
        border_color_2: "#e7e7e7",
      },
      backgroundColor: {
        color_highlighted_alt: "rgba(26,26,26,0.06);",
      },
      borderWidth: {
        bder_1: "1px",
      },
      boxShadow: {
        box_shawdow_200: "0 2px 16px 0 rgba(26,26,26,0.24);",
      },
    },
  },
  plugins: [],
};
