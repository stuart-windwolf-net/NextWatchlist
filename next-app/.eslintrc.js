module.exports = {
    "env": {
        "browser": true,
        "es2022": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",  
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:testing-library/react",
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["tsconfig.json"],
        // eslint-disable-next-line no-undef
        tsconfigRootDir: __dirname,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "no-mixed-spaces-and-tabs": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/require-await": "off", 
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/unbound-method": "off",
        "no-prototype-builtins": "off",
        "testing-library/render-result-naming-convention": "off"
     }
}
