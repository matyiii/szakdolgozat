module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 2,
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				endOfLine: 'crlf',
				useTabs: true,
				jsxSingleQuote: true,
				trailingComma: 'all',
				printWidth: 140,
				tabWidth: 4,
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
	},
};
