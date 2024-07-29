const plugin = require('tailwindcss/plugin')

module.exports = {
  // Your existing Tailwind configuration
  theme: {
    extend: {
      // Your existing extensions
    },
  },
  plugins: [
    // Your existing plugins
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.sticky': {
          position: '-webkit-sticky',
          position: 'sticky',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
}