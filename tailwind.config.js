const customConfig = require('./src/styles/tailwind.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      ...customConfig.theme?.extend,
    },
  },
  plugins: [
    ...customConfig.plugins,
  ],
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "components/ui/*": ["components/ui/*"]
    }
  },
  "include": ["src/**/*"]
}