import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "star-yellow": "#FFC700",
        "gray-100": "#EAEAEA",
        "gray-200": "#D9D9D9",
        "gray-500": "#adadad",
        "gray-700": "#7E7E7E",
        "green": "#22c55e",
        "red": "#e21414",
        "info": "#046c94",

      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translate(-80%) rotate(30deg)' },
          '50%': { transform: 'translate(0%)' },
        },
        tinyBounce: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(0, 30px) ' },
          '100%': { transform: 'translate(0,, 0)' },
        },
        slide_to_right: {
          '0%': { transform: 'translate(-80%)' },
          '50%': { transform: 'translate(0%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s',
        tinyBounce: 'tinyBounce 6s infinite',
        slide_to_right: 'slide_to_right 1s',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
