module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your React component files
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ['"Noto Serif"', 'serif'],
        nunito: ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
