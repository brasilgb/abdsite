module.exports = {
    purge: ['./resources/views/**/*.blade.php',
        './resources/js/**/*.js',
        './resources/js/**/*.jsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "ars-200": "#F7BA46",
                "ars-300": "#EFB244",
                "ars-400": "#E1A43D",
                "ars-500": "#DA9D3F",
                "ars-600": "#B3762A",
                "ars-700": "#b26d05",
                "ars-800": "##73420E",
                "ars-900": "##5A2606",
            }
        },
        fontFamily: {
            Rouge: ["Rouge Script, cursive"],
            Sail: ["sail, cursive"],
            Confortaa: ["Comfortaa, cursive"]
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: 'class',
        }),
    ],
}
