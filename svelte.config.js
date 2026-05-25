import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import { sveltePreprocess } from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// browser: {
		// 	router: true
		// },
		adapter: adapter({
			strict: false,
			fallback: '200.html',
			trailingSlash: 'always'
		}),
		prerender: {
			// use relative URLs similar to an anchor tag <a href="/test/1"></a>
			// do not include group layout folders in the path such as /(group)/test/1
			entries: ['*'],
			handleHttpError: 'warn',
			crawl: true
		},
		inlineStyleThreshold: 5000
		// trailingSlash: "always"
		// Override http methods in the Todo forms
	},
	onwarn: (warning, handler) => {
		// return
		// console.log(warning.code)
		if (
			warning.code === 'css-unused-selector' ||
			warning.code === 'a11y-no-static-element-interactions' ||
			warning.code === 'a11y-click-events-have-key-events'
		) {
			return;
		}
		handler(warning);
	}
};

export default config;
