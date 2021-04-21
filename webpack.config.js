const isDev = (nodeEnv) => {
    return "development" === nodeEnv;
};

module.exports = ({ NODE_ENV = "production" }) => {
    return {
        entry: {
            content: "./src/js/content/content-script.js",
            options: "./src/js/options/options-page.js",
            popup: "./src/js/popup-page.js",
        },
        devtool: isDev(NODE_ENV) ? "inline-source-map" : undefined,
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                },
            ],
        },
        output: {
            path: __dirname + "/dist/js",
        },
    };
};
