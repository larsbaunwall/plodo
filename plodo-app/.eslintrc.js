module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "@vue/standard"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "parser": "vue-eslint-parser",
    "parserOptions": {
      "parser": "babel-eslint",
      "sourceType": "module",
      "ecmaFeatures": {
        "modules": true
      }
    },
};