import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
		host: true
	},
	plugins: [react(), pluginRewriteAll()]
});
