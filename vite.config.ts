import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			assets: '/src/assets',
			common: '/src/common',
			components: '/src/components',
			hooks: '/src/hooks',
			domain: '/src/domain',
			infrastructure: '/src/infrastructure',
		},
	},
});
