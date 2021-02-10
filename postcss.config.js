module.exports = {
    prefix:"wt-",
    important: true,
    plugins: [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ],
};
