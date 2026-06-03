
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(transparent)" | "/(standard)" | "/" | "/(standard)/_FAQ" | "/(standard)/_FAQ/[question]" | "/(standard)/_ad" | "/(standard)/_ad/min" | "/(standard)/_ad/min/checkout" | "/(standard)/_after" | "/(standard)/_cart" | "/(standard)/_checkout" | "/(standard)/_gifts" | "/(standard)/_multi_successful" | "/(standard)/_reviews" | "/(standard)/_successful" | "/(standard)/_users" | "/about" | "/(standard)/blog" | "/(standard)/blog/post" | "/(standard)/blog/post/about_us" | "/(standard)/order" | "/(standard)/order/submitted" | "/(standard)/products" | "/(standard)/products/[page]" | "/sverdle" | "/sverdle/how-to-play";
		RouteParams(): {
			"/(standard)/_FAQ/[question]": { question: string };
			"/(standard)/products/[page]": { page: string }
		};
		LayoutParams(): {
			"/(transparent)": Record<string, never>;
			"/(standard)": { question?: string; page?: string };
			"/": { question?: string; page?: string };
			"/(standard)/_FAQ": { question?: string };
			"/(standard)/_FAQ/[question]": { question: string };
			"/(standard)/_ad": Record<string, never>;
			"/(standard)/_ad/min": Record<string, never>;
			"/(standard)/_ad/min/checkout": Record<string, never>;
			"/(standard)/_after": Record<string, never>;
			"/(standard)/_cart": Record<string, never>;
			"/(standard)/_checkout": Record<string, never>;
			"/(standard)/_gifts": Record<string, never>;
			"/(standard)/_multi_successful": Record<string, never>;
			"/(standard)/_reviews": Record<string, never>;
			"/(standard)/_successful": Record<string, never>;
			"/(standard)/_users": Record<string, never>;
			"/about": Record<string, never>;
			"/(standard)/blog": Record<string, never>;
			"/(standard)/blog/post": Record<string, never>;
			"/(standard)/blog/post/about_us": Record<string, never>;
			"/(standard)/order": Record<string, never>;
			"/(standard)/order/submitted": Record<string, never>;
			"/(standard)/products": { page?: string };
			"/(standard)/products/[page]": { page: string };
			"/sverdle": Record<string, never>;
			"/sverdle/how-to-play": Record<string, never>
		};
		Pathname(): "/" | "/_FAQ" | "/_FAQ/" | `/_FAQ/${string}` & {} | `/_FAQ/${string}/` & {} | "/_ad" | "/_ad/" | "/_ad/min" | "/_ad/min/" | "/_ad/min/checkout" | "/_ad/min/checkout/" | "/_after" | "/_after/" | "/_cart" | "/_cart/" | "/_checkout" | "/_checkout/" | "/_gifts" | "/_gifts/" | "/_multi_successful" | "/_multi_successful/" | "/_reviews" | "/_reviews/" | "/_successful" | "/_successful/" | "/_users" | "/_users/" | "/about" | "/about/" | "/blog" | "/blog/" | "/blog/post" | "/blog/post/" | "/blog/post/about_us" | "/blog/post/about_us/" | "/order" | "/order/" | "/order/submitted" | "/order/submitted/" | "/products" | "/products/" | `/products/${string}` & {} | `/products/${string}/` & {} | "/sverdle" | "/sverdle/" | "/sverdle/how-to-play" | "/sverdle/how-to-play/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/bac3/bac3-box.jpeg" | "/bac3/bac3-group.jpeg" | "/bac3/bac3-solo.jpeg" | "/bac3/bac3-solo.png" | "/BlankVial.png" | "/bpc-15710/ac0564cf-ca67-4fef-b5d3-169b29b7b230.png" | "/bpc-15710/bpc-157-box.jpeg" | "/bpc-15710/bpc-157-group.jpeg" | "/bpc-15710/bpc-157-lay.jpeg" | "/bpc-15710/bpc-157-solo.jpeg" | "/bpc-15710/bpc-157-solo.png" | "/cjc-1295-no-dac10/cjc-1295-no-dac-box.jpeg" | "/cjc-1295-no-dac10/cjc-1295-no-dac-group.jpeg" | "/cjc-1295-no-dac10/cjc-1295-no-dac-lay.jpeg" | "/cjc-1295-no-dac10/cjc-1295-no-dac-solo.jpeg" | "/cjc-1295-no-dac10/cjc-1295-no-dac-solo.png" | "/Design1.png" | "/favicon.svg" | "/ghk-cu50/GHK-cu-blue50.png" | "/ghk-cu50/ghk-cu-box.jpeg" | "/ghk-cu50/ghk-cu-darkblue.png" | "/ghk-cu50/ghk-cu-real.png" | "/ghk-cu50/ghk-cu-solo.png" | "/ghk-cu50/ghk-cu50.png" | "/ghk-cu50/ghk1.jpeg" | "/ghk-cu50/ghk3.jpeg" | "/ipamorelin5/ChatGPT Image May 25, 2026, 11_26_51 AM.png" | "/ipamorelin5/ipa-box.jpeg" | "/ipamorelin5/ipa-group.jpeg" | "/ipamorelin5/ipa-solo.jpeg" | "/ipamorelin5/ipa5-solo.png" | "/logo.png" | "/reta10/reta-10-pile.jpeg" | "/reta10/reta-yellow-10.png" | "/reta10/reta10-stand.jpeg" | "/reta10/Reta10.png" | "/reta10/reta10x10-box.jpeg" | "/reta10/reta_raw.jpeg" | "/reta10/reta_real_remix.png" | "/reta20/reta20-box.jpeg" | "/reta20/reta20-group.jpeg" | "/reta20/reta20-lay.jpeg" | "/reta20/reta20-solo.jpeg" | "/reta20/reta20-solo.png" | "/robots.txt" | "/rt10.png" | "/t30.png" | "/tesamorelin20/9bfd37f9-3884-4bd0-aeee-882a7e67cab9.png" | "/tesamorelin20/tesa20-box.jpeg" | "/tesamorelin20/tesa20-group.jpeg" | "/tesamorelin20/tesa20-solo.jpeg" | "/tesamorelin20/tesa20-solo.png" | "/tirz30/signal-2025-10-17-203628.jpeg" | "/tirz30/tirz30-box.jpeg" | "/tirz30/tirz30-green.png" | "/tirz30/tirz30-pink.png" | "/tirz30/tirz30-single.png" | "/tirz30/tirz30x3.png" | "/tirz30/tirz60.png" | "/usa.JPG" | string & {};
	}
}