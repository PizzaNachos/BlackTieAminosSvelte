import { browser } from "$app/environment";
import { get, writable } from 'svelte/store';
import type { cart_product, product } from '$lib/interfaces';
import { all_products_store } from "./products";
import { goto } from "$app/navigation";
import { free_shipping, regular_shipping } from "./products";
import { app_config } from "$lib/config";

let cart_from_storage_string;
let cart_from_storage;
if (browser) {
    try {
        cart_from_storage_string = window.localStorage.getItem("cart_contents") ?? ''
        let candy = get(all_products_store).map(p => p.prods.map(r => r.stripe_key)).flat()
        cart_from_storage = JSON.parse(cart_from_storage_string).filter(pro => {
            return (candy.includes(pro.product.stripe_key) || pro.product.alias == "ship")
        })
        window.localStorage.setItem("cart_contents", JSON.stringify(cart_from_storage))
    } catch (e) {
        console.error("Unable to load card");
        cart_from_storage = undefined;
    }

}

function hash(string: string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
}



export const cart_contents = writable(cart_from_storage ?? new Array<cart_product>());
let stripe_code = "";
export let accepted_code = writable("");


let codes = ["874958c6674a6fc359a2b3d3473bafe7571abc6f89a1ee2625d53e4bc2d54b6b", "05049ddf80a34a794cc503efe8781694b5e160db5742e645d221afaa8bf361c8"]
if (browser) {
    cart_contents.subscribe(contents =>
        window.localStorage.setItem("cart_contents", JSON.stringify(contents))
    )
    // let stripe_load_count = 0;
    // try{
    //     setTimeout(() => {
    //         stripe = Stripe("pk_live_51K1fDGD3LzjANe5w2MDH7mFH0HqQphzc6LppQIOm6muiUAZKgL0vupQYyHJ6g3dBrbG8FPgDlsdghtAMEgtbo72H00Mx6Wo9AU");
    //     }, 1000)
    // } catch (e){
    //     for(let i = 0; i < 3; i++){
    //         try{
    //             if (stripe == null){
    //                 setTimeout(() => {
    //                     stripe = Stripe("pk_live_51K1fDGD3LzjANe5w2MDH7mFH0HqQphzc6LppQIOm6muiUAZKgL0vupQYyHJ6g3dBrbG8FPgDlsdghtAMEgtbo72H00Mx6Wo9AU");
    //                 }, 1000)
    //             }
    //         } catch(e) {
    //             stripe_load_count += 1;
    //         }
    //     }
    //     if (stripe_load_count == 3){
    //         console.error(e)
    //         alert("Unable to initialize payment proscesser: Try refreshing the page or email info@coloradotoffee.com: Error code 102");
    //     }

    // }
}

export const update_quantity = (updated_product: product, new_quantity: number) => {
    if (new_quantity == 0) {
        remove_from_cart({ product: updated_product, ammount: 0 });
        return;
    }

    let c: cart_product[] = get(cart_contents)
    for (let i = 0; i < c.length; i++) {
        if (c[i].product.stripe_key == updated_product.stripe_key) {
            c[i].ammount = new_quantity;
        }
    }
    cart_contents.set(c);
    check_shipping()
}
export const add_to_cart = (product: product) => {
    let c: cart_product[] = get(cart_contents)
    if (c.map(p => p.product.stripe_key).includes(product.stripe_key)) {
        for (let i = 0; i < c.length; i++) {
            if (c[i].product.stripe_key == product.stripe_key) {
                c[i].ammount += 1;
            }
        }
    } else {
        let new_product: cart_product = {
            product: product,
            ammount: 1
        }
        c.push(new_product)
    }

    cart_contents.set(c);
    check_shipping()
}
export const remove_from_cart = (product: cart_product) => {
    let c = get(cart_contents).filter(p => p.product.stripe_key != product.product.stripe_key);
    cart_contents.set(c);
    check_shipping()
}
export const empty_cart = () => {
    cart_contents.set(new Array<cart_product>());
}
const check_shipping = (contents = null) => {
    let c: cart_product[] = contents ?? get(cart_contents);

    c = c.filter(c => c.product.alias != "ship");
    let cart_size = (c.length > 0) ? (c.map((c) => c.product.alias != 'ship' ? c.ammount : 0).reduce((a, b) => a + b)) : 0;
    let ammount = (c.length > 0) ? Math.ceil(cart_size / 6) : 0;


    if (cart_size >= 3) {
        c = c.filter(cart_product => cart_product.product.alias != 'ship')
        // Need to swap for Free shipping
        if (c.map(p => p.product.stripe_key).includes(free_shipping.stripe_key)) {
            for (let i = 0; i < c.length; i++) {
                if (c[i].product.stripe_key == free_shipping.stripe_key) {
                    c[i].ammount = ammount;
                }
            }
        } else {
            let new_product: cart_product = {
                product: free_shipping,
                ammount: ammount
            }
            c.push(new_product)
        }
    } else {
        c = c.filter(cart_product => cart_product.product.alias != 'ship')
        // Use normal shipping
        if (c.map(p => p.product.stripe_key).includes(regular_shipping.stripe_key)) {
            for (let i = 0; i < c.length; i++) {
                if (c[i].product.stripe_key == regular_shipping.stripe_key) {
                    c[i].ammount = ammount;
                }
            }
        } else {
            let new_product: cart_product = {
                product: regular_shipping,
                ammount: ammount
            }
            c.push(new_product)
        }
    }

    cart_contents.set(c);
}
export const get_line_items_to_checkout = () => {
    if (browser) {
        check_shipping();
        let c: cart_product[] = get(cart_contents);
        let line_items = c.map(c => {
            return { quantity: c.ammount, price: c.product.stripe_key }
        });
        if (c.length == 0) {
            return [];
        } else {
            return line_items;
        }
    } else {
        return [];
    }
}
export const check_out = () => {
    let stripe
    try {
        stripe = Stripe("pk_live_51K1fDGD3LzjANe5w2MDH7mFH0HqQphzc6LppQIOm6muiUAZKgL0vupQYyHJ6g3dBrbG8FPgDlsdghtAMEgtbo72H00Mx6Wo9AU");
    } catch (e) {
        console.error(e)
        alert("Unable to checkout: Try refreshing the page or using a different browser: Or email info@coloradotoffee.com: Code 102")
    }

    if (browser && stripe) {
        let line_items = get_line_items_to_checkout()
        const { error } = stripe.redirectToCheckout({
            lineItems: line_items,
            shippingAddressCollection: {
                allowedCountries: ["US"],
            },
            // discounts : [{
            //     coupon: stripe_code,
            // }],
            submitType: "pay",
            mode: "payment",
            successUrl: `https://www.coloradotoffee.com/after/`,
            cancelUrl: `https://www.coloradotoffee.com/`,
        });
        if (error) {
            alert("Something is broken! Please email info@coloradotoffee.com, Error code 103");
        }
    } else {
        alert("Something is broken! Please email info@coloradotoffee.com, Error code 104");
    }
}

check_shipping();



export const get_new_checkout_items = () => {
    if (browser) {
        check_shipping();
        let c: cart_product[] = get(cart_contents);//.filter((c: cart_product) => c.product.alias != "ship");
        let line_items = c.map(c => {
            return { amount: c.ammount, id: c.product.stripe_key }
        });
        if (c.length == 0) {
            return [];
        } else {
            return line_items;
        }
    } else {
        return [];
    }
}
export async function new_checkout(event: Event, pre_order: boolean, ship_date?: string, timeout = 500,) {
    let items = get_new_checkout_items()
    // if (items.length == 1) {
    //     return;
    // }
    // if (!new_api_healthy) {
    //     // Fallback to old checkout if not good
    //     check_out();
    //     return;
    // }

    let body = {
        items: items,
        pre_order: pre_order,
        ship_date: ship_date
    }

    const interaction = {
        t: "click",
        d: { target: event?.target?.id }
    }

    try {
        // console.log("abou to ack Interaction post", interaction);
        // let ack = await new_socket.emitWithAck('interaction-ack', interaction)
        // console.log("Acking Interaction post", ack)

        // let res = await fetch(`${app_config.api_base}/aapii/checkout/create`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(body)
        // })

        // if (res.status == 200 || res.status == 201) {
        //     let link = await res.text()
        //     window.location.assign(link);
        // } else {
        //     alert("We are unable to verify your checkout session, please try again later")
        // }
    } catch (e) {
        console.error(e)
    }
}