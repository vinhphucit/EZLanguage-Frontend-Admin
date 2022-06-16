import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	
	kit: {
		adapter: adapter(),
		files:{
			hooks:`src/hooks/default.ts`
		},
		vite:{
			resolve:{
				alias:{
					
					$lib: resolve('./src/lib'),
					$stores: resolve('./src/stores'),
					$assets: resolve('./src/assets'),
					$src: resolve('./src'),
				}
			}
		}
	}
};

export default config;
