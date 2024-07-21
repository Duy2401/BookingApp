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
        textGrey: "#595959",
      },
      gridTemplateColumns: {
        grid_col_2: "auto 3fr",
        grid_col_2A: " 262px auto;",
      },
      flex: {
        flex25: "0 0 25%",
        flex30: "0 0 30%",
      },
      width: {
        w_10: "calc(100% - 10px)",
        w_50: "calc(50% - 9px)",
      },
      height: {
        h_48: "48px",
        h_500: "500px",
        h_100_vh: "100vh",
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
        p_5_10: "5px 10px",
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
        bgC_1: "rgba(0, 0, 0, 0.6);",
      },
      borderWidth: {
        bder_1: "1px",
      },
      boxShadow: {
        box_shawdow_200: "0 2px 16px 0 rgba(26,26,26,0.24);",
        box_shawdow_100: "4.0px 8.0px 8.0px rgba(0,0,0,0.38)",
        box_shawdow_300: "rgba(0,0,0,0.24)0px 3px8px",
      },
    },
  },
  plugins: [],
};
