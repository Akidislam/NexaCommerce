const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Roboto', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                nexa: {
                    blue: '#2979FF',
                    'blue-light': '#448AFF',
                    'blue-dark': '#2962FF',
                    orange: '#F85606',
                    'orange-light': '#FF6F20',
                    gray: {
                        50: '#FAFAFA',
                        100: '#F5F5F5',
                        200: '#EEEEEE',
                        300: '#E0E0E0',
                        400: '#BDBDBD',
                        500: '#9E9E9E',
                        600: '#757575',
                        700: '#616161',
                        800: '#424242',
                        900: '#212121',
                    },
                    success: '#00C853',
                    warning: '#FFD600',
                    danger: '#FF1744',
                    info: '#00B0FF',
                },
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0,0,0,0.08)',
                'card-hover': '0 4px 12px rgba(0,0,0,0.12)',
                'navbar': '0 2px 8px rgba(0,0,0,0.06)',
                'dropdown': '0 4px 16px rgba(0,0,0,0.12)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
