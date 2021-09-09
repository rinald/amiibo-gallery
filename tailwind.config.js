module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      header: 'Urbanist, sans-serif',
      body: 'Poppins, sans-serif',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
