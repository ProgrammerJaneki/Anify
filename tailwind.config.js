/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         borderRadius: {
            sm: '0.25rem', // 4px
         },
         colors: {
            'smoke-darkest': 'rgba(0, 0, 0, 0.9)',
            'smoke-darker': 'rgba(0, 0, 0, 0.75)',
            'smoke-dark': 'rgba(0, 0, 0, 0.6)',
            // smoke: "rgba(0, 0, 0, 0.5)",
            'smoke-light': 'rgba(0, 0, 0, 0.4)',
            'smoke-lighter': 'rgba(0, 0, 0, 0.25)',
            'smoke-lightest': 'rgba(0, 0, 0, 0.1)',
         },
         screens: {
            'sec-md': '820px',
            'third-md': '900px'
         },
         gridTemplateColumns: {
            'relations-auto': 'repeat(auto-fit, minmax(100px, 1fr))',
         },
      },
   },
   plugins: [
      // ...
      // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
      require('tailwind-scrollbar')({ nocompatible: true }),
   ],
};
