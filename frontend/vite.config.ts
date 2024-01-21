import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()],
})*/

export default ({ mode }) => {
	const parentFolder = path.resolve(process.cwd(), '..');

    process.env = {...process.env, ...loadEnv(mode, parentFolder)};
	console.log(process.cwd());

    return defineConfig({
        plugins: [
            react(),
        ],
    })
}