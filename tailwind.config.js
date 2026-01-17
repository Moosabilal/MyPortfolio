/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'accent-primary': 'var(--accent-primary)',
                'accent-secondary': 'var(--accent-secondary)',
                'accent-glow': 'var(--accent-glow)',
            },
            fontFamily: {
                main: ['var(--font-main)'],
                outfit: ['Outfit', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '20px',
                screens: {
                    lg: '1200px',
                },
            },
            keyframes: {
                morph: {
                    '0%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
                    '50%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
                    '100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
                }
            },
            animation: {
                morph: 'morph 8s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
