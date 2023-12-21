module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'eslint-config-prettier',
	],
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			typescript: {
				project: './tsconfig.json',
			},
		},
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: '.',
		project: ['./tsconfig.json', './tsconfig.node.json'],
	},

	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', '@typescript-eslint'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'react/react-in-jsx-scope': 'off',
		'linebreak-style': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/ban-types': [
			'error',
			{
				extendDefaults: true,
				types: {
					'{}': false,
				},
			},
		],
		'object-shorthand': 'error',
		'no-console': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'error',
	},
};
