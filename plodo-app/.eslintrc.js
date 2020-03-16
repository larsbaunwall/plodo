module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "plugins": ["prettier"],
    "extends": [
        // "eslint:recommended",
         "plugin:vue/recommended",
        // "@vue/standard"
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