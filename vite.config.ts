import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		alias: [{ find: '@Styles', replacement: resolve('./src/styles') as string }],
	},
});
