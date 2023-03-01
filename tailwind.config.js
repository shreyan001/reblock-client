/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
 
   
      extend: {
        colors: {
          'black1': '#232323',
          'black2': '#262626',
          'black3': '#IEIEIE',
          'black4': '#0D0D0D',
          gray: { "100": "#14171f", "200": "#0e1015", "300": "#0d0d0d" },
          darkgray: "#a1a4aa",
          white: "#fff",
          mediumspringgreen: "#00ef8c",
          gainsboro: "#e3e4e8",
          plum: "#ec91d8",
          yellow: "#faff00",
          mediumpurple: "#918cf2",
        },
        fontSize: {
        
          '1xl': ['2.41rem', '1'],
          'small':['8.3px']
        }
      },
    },
  plugins: [],
}