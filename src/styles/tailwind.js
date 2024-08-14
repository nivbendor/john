const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      // Your custom theme extensions, if any
    },
    // screens: {
    //   'sm': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '768px',
    //   // => @media (min-width: 768px) { ... }

    //   'lg': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    // }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.sticky': {
          position: '-webkit-sticky',
          // eslint-disable-next-line no-dupe-keys
          position: 'sticky',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
    // Any other plugins you're using
  ],
}