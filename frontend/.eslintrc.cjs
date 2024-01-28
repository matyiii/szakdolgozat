module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'no-console': 1, // Means warning
		'prettier/prettier': 2, // Means error
		'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'crlf', useTabs: true, jsxSingleQuote: true }]
	}
};
