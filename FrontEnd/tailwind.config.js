/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord_blue: "#295DE7",
        discord_blurple: "#7289da",
        discord_purple: "#5865f2",
        discord_green: "#3ba55c",
        main_color: "#34d399",
        secondary_color: "#ffcc66",
        beige_color: "#f6f6f6",
        angol_main: "#34BDD3",
        discord_serverBg: "#36393f",
        discord_serverSideBar: "#202225",
        discord_secondSideBar: "#2f3136",
        discord_namehoverColor: "#34373c",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        adelia: ["ADELIA", "cursive"],
      },
      // height: {
      //     "mobile" : "32rem", 
      // },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require('@tailwindcss/forms')],
};
