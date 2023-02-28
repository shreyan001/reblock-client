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
        },
        fontSize: {
        
          '1xl': ['2.41rem', '1'],
          'small':['8.3px']
        }
      },
    },
  plugins: [],
}