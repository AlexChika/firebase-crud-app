const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
   optimization: {
    usedExports: true, // tells webpack to tree-shake
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "javascript.js",
  },
  watch: true,
};
