import { browser } from "$app/environment";
import { ProductType, type product } from "$lib/interfaces";
import { get, writable, readable } from "svelte/store";
import { get_reviews_for_product } from "./reviews";
import { get_my_type_object } from "./product_types";
import { app_config } from "$lib/config";

export let glp1_store = writable<product[]>([
    {
        multi: true,
        items: [
            {
                id: 1,
                published: true,
                stripe_key: "price_1RhFcvD3LzjANe5wc2ok6PPs",
                name: "Retatrutide - 10mg",
                long_desc: [
                    `Retatrutide is a next-generation investigational peptide known for its 
            unique multi-agonist activity across the GIP, GLP-1, and glucagon receptor pathways.
             This advanced triple-agonist profile has made Retatrutide a highly sought-after compound
              in metabolic and endocrinology research. `,
                    `Our Retatrutide 10mg is provided in a sealed research vial designed for 
            controlled laboratory investigation. Each vial is prepared to maintain high
             purity and consistency, supporting reliable experimental outcomes.`,
                    `Usage Disclaimer This compound is supplied for research purposes only. 
            Not for human consumption, clinical use, or veterinary use.`
                ],
                price: 8500,
                unit: "vial",
                product_type: ProductType.glp1,
                product_image_url_paths: [
                    "/reta10/reta_real_remix.png",
                    "/reta10/reta10x10-box.jpeg",
                    "/reta10/reta10-stand.jpeg",
                    "/reta10/reta-10-pile.jpeg"
                ],
                featured_image_url_paths: [
                    "/reta10/reta_real_remix.png",
                    "/reta10/reta10x10-box.jpeg",
                    "/reta10/reta10-stand.jpeg",
                    "/reta10/reta-10-pile.jpeg"

                ],
                alias: "reta10",
                coa_path: "/toffee/nutrition/dark_1lb.jpg",
            },
            {
                id: 1,
                published: true,
                stripe_key: "price_1RhFcvD3LzjANe5wc2ok6PPs",
                name: "Retatrutide - 20mg",
                long_desc: [
                    `Retatrutide is a next-generation investigational peptide known for its 
            unique multi-agonist activity across the GIP, GLP-1, and glucagon receptor pathways.
             This advanced triple-agonist profile has made Retatrutide a highly sought-after compound
              in metabolic and endocrinology research. `,
                    `Our Retatrutide 10mg is provided in a sealed research vial designed for 
            controlled laboratory investigation. Each vial is prepared to maintain high
             purity and consistency, supporting reliable experimental outcomes.`,
                    `Usage Disclaimer This compound is supplied for research purposes only. 
            Not for human consumption, clinical use, or veterinary use.`
                ],
                price: 11000,
                unit: "vial",
                product_type: ProductType.glp1,
                product_image_url_paths: [
                    "/reta20/reta20-solo.png",
                    "/reta20/reta20-box.jpeg",
                    "/reta20/reta20-group.jpeg",
                    "/reta20/reta20-lay.jpeg"
                ],
                featured_image_url_paths: [
                    "/reta20/reta20-solo.png",
                    "/reta20/reta20-box.jpeg",
                    "/reta20/reta20-group.jpeg",
                    "/reta20/reta20-lay.jpeg"

                ],
                alias: "reta20",
                coa_path: "/toffee/nutrition/dark_1lb.jpg",
            },
        ],
    },
    {
        id: 2,
        published: true,
        stripe_key: "price_1RhFdnD3LzjANe5wKsHDy0LU",
        name: "Tirzepetide - 30mg",
        long_desc: [
            `Tirzepetide is an advanced dual - agonist research peptide known for its activity at both the GIP and GLP- 1 receptors. 
            This unique dual - pathway profile has positioned Tirzepetide as a leading compound in metabolic and endocrine research, 
            offering scientists a deeper look into mechanisms related to glucose regulation, energy balance, and peptide - based signaling.`,
            `Our Tirzepetide 30mg vial is produced with exceptional purity and consistency, delivering a refined research-grade compound suitable
             for controlled laboratory environments. Each lyophilized vial is sealed to preserve stability and ensure reliable experimental performance.`,
            `Usage Disclaimer This compound is intended solely for scientific research. 
            Not for human consumption, clinical use, or veterinary applications.`
        ],
        price: 7500,
        unit: "vial",
        product_type: ProductType.glp1,
        product_image_url_paths: [
            "/tirz30/tirz30-pink.png",
            "/tirz30/tirz30x3.png"
        ],
        featured_image_url_paths: [
            "/tirz30/tirz30-pink.png",
            "/tirz30/tirz30x3.png"
        ],
        alias: "tirz30",
        coa_path: "/toffee/nutrition/milk_1lb.jpg",
    },
]);

// export let toffees_store = writable<product[]>([])
// export let brittle_store = writable<product[]>([])
// export let butterscotch_store = writable<product[]>([])

// fetch(`${ app_config.api_base } / aapii / product`).then(res => res.json()).then((res) => {
//     toffees_store.set(res.filter(r => r.candy_type == "toffee"))
//     brittle_store.set(res.filter(r => r.candy_type == "brittle"))
//     butterscotch_store.set(res.filter(r => r.candy_type == "butterscotch"))
// })

export let secretagogues_store = writable<product[]>([
    {
        id: 15,
        published: true,
        stripe_key: "price_1S36BLD3LzjANe5wnSSlgVnq",
        name: "Tesamorelin - 20mg",
        long_desc: [
            `Tesamorelin is a precision - engineered research peptide recognized for its targeted activity as a synthetic analog of growth hormone–releasing hormone(GHRH).In controlled lab environments, Tesamorelin is valued for its ability to help researchers explore pathways related to growth hormone regulation, cellular signaling, and metabolic processes.`,
            `Our Tesamorelin 20mg vial is prepared with exceptional purity and stability, offering a refined, reliable compound for advanced scientific investigation. Each lyophilized vial is sealed to maintain integrity and support consistent experimental performance.`,
            `Usage Disclaimer
This compound is intended exclusively for scientific research. Not for human consumption, medical use, or veterinary applications.`
        ],
        price: 10000,
        unit: "vial",
        product_type: ProductType.secretagogues,
        product_image_url_paths: [
            "/tesamorelin20/tesa20-solo.png",
            "/tesamorelin20/tesa20-box.jpeg",
            "/tesamorelin20/tesa20-group.jpeg",
        ],
        featured_image_url_paths: [
            "/tesamorelin20/tesa20-solo.png",
            "/tesamorelin20/tesa20-box.jpeg",
            "/tesamorelin20/tesa20-group.jpeg",
        ],
        alias: "tesa20",
        coa_path: "/toffee/nutrition/pecan_1lb.jpg",
    },
    {
        id: 16,
        published: true,
        stripe_key: "price_1S36BLD3LzjANe5wnSSlgVnq",
        name: "Ipamorelin - 5mg",
        long_desc: [
            `Ipamorelin is a highly selective research peptide known for its focused activity as a ghrelin receptor (GHS-R1a) agonist. Its selectivity makes it a valued tool in laboratory studies examining growth hormone pathways, peptide signaling, and cellular communication. Researchers appreciate Ipamorelin for its precision-driven profile and its ability to help isolate specific metabolic and endocrine mechanisms.`,
            `Our Ipamorelin 5mg vial is prepared with elevated purity and stability, ensuring a refined compound suitable for advanced scientific environments. Each lyophilized vial is sealed to preserve integrity and support consistent, repeatable study outcomes.`,
            `Usage Disclaimer
This compound is intended exclusively for scientific research. Not for human consumption, medical use, or veterinary applications.`
        ],
        price: 4000,
        unit: "vial",
        product_type: ProductType.secretagogues,
        product_image_url_paths: [
            "/ipamorelin5/ipa5-solo.png",
            "/ipamorelin5/ipa-box.jpeg",
            "/ipamorelin5/ipa-group.jpeg",
        ],
        featured_image_url_paths: [
            "/ipamorelin5/ipa5-solo.png",
            "/ipamorelin5/ipa-box.jpeg",
            "/ipamorelin5/ipa-group.jpeg",
        ],
        alias: "ipa5",
        coa_path: "/toffee/nutrition/pecan_1lb.jpg",
    },
    {
        id: 17,
        published: true,
        stripe_key: "price_1S36BLD3LzjANe5wnSSlgVnq",
        name: "CJC-1295 NO DAC - 10mg",
        long_desc: [
            `CJC-1295 NO DAC is a refined research peptide recognized for its role as a growth hormone–releasing hormone (GHRH) analog without the DAC (Drug Affinity Complex) modification. This non-DAC variation offers researchers a shorter, more precise activity window—ideal for studying acute GHRH signaling, pulsatile hormone patterns, and metabolic regulatory pathways.`,
            `Our CJC-1295 NO DAC 10mg vial is produced with elevated purity and stability, providing a clean, consistent compound tailored for advanced scientific environments. Each lyophilized vial is sealed to preserve its integrity and support reliable experimental performance.`,
            `Usage Disclaimer
This compound is intended exclusively for scientific research. Not for human consumption, medical use, or veterinary applications.`
        ],
        price: 4000,
        unit: "vial",
        product_type: ProductType.secretagogues,
        product_image_url_paths: [
            "/cjc-1295-no-dac10/cjc-1295-no-dac-solo.png",
            "/cjc-1295-no-dac10/cjc-1295-no-dac-box.jpeg",
            "/cjc-1295-no-dac10/cjc-1295-no-dac-lay.jpeg",
            "/cjc-1295-no-dac10/cjc-1295-no-dac-group.jpeg",
        ],
        featured_image_url_paths: [
            "/cjc-1295-no-dac10/cjc-1295-no-dac-solo.png",
            "/cjc-1295-no-dac10/cjc-1295-no-dac-box.jpeg",
            "/cjc-1295-no-dac10/cjc-1295-no-dac-lay.jpeg",
            "/cjc-1295-no-dac10/cjc-1295-no-dac-group.jpeg",
        ],
        alias: "cjc10",
        coa_path: "/toffee/nutrition/pecan_1lb.jpg",
    },
]);

export let everything_else = writable<product[]>([
    {
        id: 18,
        published: true,
        stripe_key: "price_1S36BLD3LzjANe5wnSSlgVnq",
        name: "BPC-157 - 10mg",
        long_desc: [
            `BPC - 157 is a synthetic research peptide derived from the naturally occurring Body Protection Compound(BPC) found in gastric protein.In controlled laboratory environments, BPC - 157 is valued for its role in studying cellular repair pathways, angiogenic signaling, and tissue- level regenerative mechanisms.Its stability and targeted activity make it a preferred compound for researchers examining peptide - driven healing processes and molecular recovery responses.`,
            `Our BPC-157 10mg vial is produced with elevated purity and consistency, offering a refined lyophilized peptide crafted for advanced scientific investigation. Each vial is sealed for stability, clarity, and reliable experimental performance.`,
            `Usage Disclaimer
This compound is intended exclusively for scientific research.Not for human consumption, medical use, or veterinary applications.`
        ],
        price: 5000,
        unit: "vial",
        product_type: ProductType.peptide,
        product_image_url_paths: [
            "/bpc-15710/bpc-157-solo.png",
            "/bpc-15710/bpc-157-box.jpeg",
            "/bpc-15710/bpc-157-lay.jpeg",
            "/bpc-15710/bpc-157-group.jpeg",
        ],
        featured_image_url_paths: [
            "/bpc-15710/bpc-157-solo.png",
            "/bpc-15710/bpc-157-box.jpeg",
            "/bpc-15710/bpc-157-lay.jpeg",
            "/bpc-15710/bpc-157-group.jpeg",
        ],
        alias: "bpc10",
        coa_path: "/toffee/nutrition/pecan_1lb.jpg",
    },
    {
        id: 18,
        published: true,
        stripe_key: "price_1S36BLD3LzjANe5wnSSlgVnq",
        name: "GHK-CU - 50mg",
        long_desc: [
            `GHK-Cu is a copper-binding tripeptide widely recognized in scientific research for its role in cellular signaling, tissue remodeling, and regenerative pathways. In laboratory environments, GHK-Cu is valued for its ability to help researchers examine mechanisms related to collagen synthesis, antioxidant activity, and peptide-driven repair processes. Its elegant molecular profile and high affinity for copper ions make it a powerful tool for studying cellular restoration and biochemical communication.`,
            `Our GHK-Cu 50mg vial is prepared with exceptional purity and stability, offering a refined lyophilized compound suited for advanced scientific investigation. Each vial is sealed to maintain integrity, consistency, and reliable performance across research applications.`,
            `Usage Disclaimer
This compound is intended exclusively for scientific research.Not for human consumption, medical use, or veterinary applications.`
        ],
        price: 4000,
        unit: "vial",
        product_type: ProductType.peptide,
        product_image_url_paths: [
            "/ghk-cu50/ghk-cu-solo.png",
            "/ghk-cu50/ghk-cu-box.jpeg",
        ],
        featured_image_url_paths: [
            "/ghk-cu50/ghk-cu-solo.png",
            "/ghk-cu50/ghk-cu-box.jpeg",
        ],
        alias: "ghkcu10",
        coa_path: "/toffee/nutrition/pecan_1lb.jpg",
    },
    {
        id: 19,
        published: true,
        stripe_key: "price_1S36BLD3LzjANe5wnSSlgVnq",
        name: "BAC Water - 3ml",
        long_desc: [
            `Bacteriostatic Water is a laboratory-grade diluent containing 0.9% benzyl alcohol, designed to inhibit bacterial growth and maintain stability after initial puncture. In research environments, it is commonly used to reconstitute lyophilized compounds and support controlled experimental preparation.`,
            `At Black Tie Aminos, our 3mL Bacteriostatic Water is presented with the same refined, modern-clinical standard as our peptides—clean, reliable, and crafted for precision-focused scientific work.`,
            `Usage Disclaimer
This compound is intended exclusively for scientific research.Not for human consumption, medical use, or veterinary applications.`
        ],
        price: 250,
        unit: "vial",
        product_type: ProductType.peptide,
        product_image_url_paths: [
            "/bac3/bac3-solo.png",
            "/bac3/bac3-box.jpeg",
            "/bac3/bac3-group.jpeg"
        ],
        featured_image_url_paths: [
            "/bac3/bac3-solo.png",
            "/bac3/bac3-box.jpeg",
            "/bac3/bac3-group.jpeg"
        ],
        alias: "bac3",
        coa_path: "/toffee/nutrition/pecan_1lb.jpg",
    },
]);

export const regular_shipping: product = {
    id: 11,
    name: "Flat rate shipping",
    stripe_key: "price_1LZNveD3LzjANe5wj79NZmCF",
    price: 960,
    featured_image_url_paths: [""],
    product_image_url_paths: [""],
    alias: "ship",
    unit: "box",
    long_desc: [""],
};
// if(PUBLIC_IS_TEST){
//     regular_shipping.key = "price_1K9eGhD3LzjANe5wkk2WYVSJ"
// }
export const free_shipping: product = {
    id: 12,
    name: "Free Shipping",
    stripe_key: "price_1LqOSPD3LzjANe5widuIZZWw",
    price: 0,
    featured_image_url_paths: [""],
    product_image_url_paths: [""],
    alias: "ship",
    unit: "box",
    long_desc: [""],
};

export const get_prod_by_page_key = (page_key: string) => {
    // I know this is slow but i dont wanna deal with it rn
    let page_to_product: Map<string, product> = new Map();
    let t = get(glp1_store);
    t.forEach((a) => page_to_product.set(a.alias, a));
    let c = get(secretagogues_store);

    c.forEach((a) => page_to_product.set(a.alias, a));

    let b = get(everything_else);
    b.forEach((a) => page_to_product.set(a.alias, a));
    return page_to_product.get(page_key) ?? t[0];
};

export function get_upsells(current_product_alias: String) {
    let ps = get(glp1_store).filter(
        (a) => a.alias != current_product_alias && a.alias != "fathers"
    );
    let ls = get(secretagogues_store).filter((a) => a.alias != current_product_alias);
    let bs = get(everything_else).filter(
        (a) => a.alias != current_product_alias
    );

    let new_ps = [...ps, ...ls];
    new_ps.sort((a: any, b: any) => {
        return (
            (get_reviews_for_product(a?.alias)?.length ?? 0) -
            (get_reviews_for_product(b?.alias)?.length ?? 0)
        );
    });
    return ps.slice(0, 3);
}
export function get_prod_from_stripe_key(stripe_key: String): product | null {
    let t = get(glp1_store)
        .concat(get(secretagogues_store))
        .concat(get(everything_else));
    for (let i = 0; i < t.length; i++) {
        if (t[i].stripe_key == stripe_key) {
            return t[i];
        }
    }
    return null;
}
export let all_products_store = readable([
    {
        meta: get_my_type_object(ProductType.glp1),
        prods: get(glp1_store),
    },
    {
        meta: get_my_type_object(ProductType.secretagogues),
        prods: get(secretagogues_store),
    },
    {
        meta: get_my_type_object(ProductType.peptide),
        prods: get(everything_else),
    },
]);
