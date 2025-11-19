import { browser } from "$app/environment";
import { get, writable } from 'svelte/store';
import type { cart_product, product } from '$lib/interfaces';
import {all_products_store } from "./products";
import { goto } from "$app/navigation";
// import { new_api_healthy, new_socket, socket } from "./interactions";
import { free_shipping, regular_shipping } from "./products";
import { app_config } from "$lib/config";

let cart_from_storage_string;
let cart_from_storage;

export interface MultiOrderType{
    email:string,
    orders: SingleOrderType[]
}
export interface SingleOrderType{
    address: Address | null,
    products: CartProduct[]
}
// export interface Address{
//     name:string
//     line1:string
//     line2:string

// }
export interface CartProduct{
    id: string,
    amount: number
}
export interface Address{
    name: string,
    address:{
        line1: string,
        line2: string,
        city: string,
        postal_code: string,
        state: string,
        country: string,
    }
}


if(browser) {
    try{
        cart_from_storage_string = window.localStorage.getItem("multi_order") ?? ''
        // let candy = get(all_products_store).map(p => p.prods.map(r => r.key)).flat()
        cart_from_storage = JSON.parse(cart_from_storage_string)
        let list_of_all_product_keys = get(all_products_store).map(p => p.prods.map(r => r.stripe_key)).flat();
        cart_from_storage.orders.forEach((ord:SingleOrderType) => {
            ord.products = ord.products.filter(p => list_of_all_product_keys.includes(p.id))
        })
        if(cart_from_storage == null){
            cart_from_storage = {email:"",orders:[
                {
                    address:null,
                    products:[]
                }
            ]};        
        }
        // window.localStorage.setItem("cart_contents", JSON.stringify(cart_from_storage))
    } catch(e){
        console.error("Unable to load cart");
        cart_from_storage = {email:"",orders:[
            {
                address:null,
                products:[]
            }
        ]};    
    }
} else {
    cart_from_storage = {email:"",orders:[
        {
            address:null,
            products:[]
        }
    ]};

}





export const multi_order_object = writable<MultiOrderType>(cart_from_storage);
export function empty_multi_cart(){
    multi_order_object.set({email:"",orders:[
        {
            address:null,
            products:[]
        }
    ]})
}

if(browser) {
    multi_order_object.subscribe(contents => 
        window.localStorage.setItem("multi_order", JSON.stringify(contents))
    )
}

export const add_shipment = () => {
    let m = get(multi_order_object)
    m.orders.push({address:null, products:[]})
    multi_order_object.set(m)
}
export const remove_shipment = (index:number) => {
    let m = get(multi_order_object)
    m.orders.splice(index,1)
    multi_order_object.set(m)
}
export const add_product_to_shipment = (shipment_id:number, product_key:string) => {
    let m = get(multi_order_object)
    m.orders[shipment_id].products.push({id:product_key,amount:1})
    multi_order_object.set(m)
}
export const change_product_amount_in_shipment = (shipment_id:number, product_key:string, amount:number) => {
    let m = get(multi_order_object)
    let this_prods = m.orders[shipment_id].products

    if(amount == 0) {
        this_prods = this_prods.filter(p => p.id != product_key);
    } else {
        for(let i = 0; i < this_prods.length; i++) {
            if(this_prods[i].id == product_key) {
                this_prods[i].amount = amount
            }
        }
    }

    m.orders[shipment_id].products = this_prods
    multi_order_object.set(m)
}
export const set_shipment_address = (shipment_id:number, address:Address) => {
    let m = get(multi_order_object)
    m.orders[shipment_id].address = address
    multi_order_object.set(m)
}
export const set_email = (email:string) => {
    let m = get(multi_order_object)
    m.email = email
    multi_order_object.set(m)
}
export const checkout_multi_order = async () => {
    // if(!new_api_healthy){
    //     return false;
    // }
    let big_map = new Map();
    let order_objs = get(multi_order_object);
    let postable_object : MultiOrderType = {
        email: order_objs.email,
        orders:order_objs.orders
    }

    const interaction = {
        t: "click",
        d: {target: "multi_checkout_checkout_form"}
    }

    try {
        // let ack = await new_socket?.emitWithAck('interaction-ack', interaction)
        // console.log("Acking Interaction post", ack)

        let res = await fetch(`${app_config.api_base}/aapii/multi_checkout/create`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postable_object)
        })

        if(res.status == 201){
            let link = await res.text()
            window.location.assign(link);
        } else {
            alert("We are unable to verify your checkout session, please try again later")
        }
    } catch(e) {
        console.error(e)
    }

    console.log("Checking out!")
    return true;
}



// export const update_quantity = (updated_product: product, new_quantity: number) => {
//     if(new_quantity == 0){
//         remove_from_cart({product: updated_product, ammount: 0});
//         return;
//     }

//     let c : cart_product[] = get(cart_contents)
//     for(let i = 0; i < c.length; i++){
//         if(c[i].product.key == updated_product.key){
//             c[i].ammount = new_quantity;
//         }
//     }
//     cart_contents.set(c);
//     check_shipping()
// }
// export const add_to_cart = (product: product) => {
//     let c : cart_product[] = get(cart_contents)
//     if(c.map(p => p.product.key).includes(product.key)){
//         for(let i = 0; i < c.length; i++){
//             if(c[i].product.key == product.key){
//                 c[i].ammount += 1;
//             }
//         }
//     } else {
//         let new_product : cart_product = {
//             product: product,
//             ammount: 1
//         }
//         c.push(new_product)
//     }

//     cart_contents.set(c);
//     check_shipping()
// }
// export const remove_from_cart = (product: cart_product) => {
//     let c = get(cart_contents).filter(p => p.product.key != product.product.key);
//     cart_contents.set(c);
//     check_shipping()
// }
// export const empty_cart = () => {
//     cart_contents.set(new Array<cart_product>());
// }
// export const code = async (code_to_test:string) => {
//     // stripe_code = code_to_test.toLowerCase();

//     let testable = await hash(code_to_test.toLowerCase().trim())
//     if(codes.includes(testable)){
//         s = true;
//         check_shipping();
//         accepted_code.set(code_to_test)
//     }
// }
// const check_shipping = (contents = null) => {
//     let c : cart_product[] = contents ?? get(cart_contents);

//     // let free_ships = ['price_1PGXmED3LzjANe5wivDoNG4U','price_1PGXnPD3LzjANe5wdvn4a0Aj']
//     // let free_shipping_override = false;
//     // let product_codes = c.map(p => p.product.key);
//     // for(let i = 0; i < free_ships.length; i++){
//     //     if(product_codes.includes(free_ships[i])){
//     //         free_shipping_override = true
//     //     }
//     // }

//     c = c.filter(c => c.product.alias != "ship");
//     let cart_size = (c.length > 0) ? (c.map((c) => c.product.alias != 'ship' ? c.ammount : 0).reduce((a,b) => a + b) ) : 0;
//     // let pounds = c.filter(cart_product => cart_product.product.unit == 'pound').map(c => c.ammount).reduce((a,b) => {return a + b}, 0)

//     // console.log(cart_size)

//     let ammount = (c.length > 0) ? Math.ceil(cart_size / 5) : 0;


//     // if(cart_size >= 3 || s || free_shipping_override){
//     //     c = c.filter(cart_product => cart_product.product.alias != 'ship')
//     //     // Need to swap for Free shipping
//     //     if(c.map(p => p.product.key).includes(free_shipping.key)){
//     //         for(let i = 0; i < c.length; i++){
//     //             if(c[i].product.key == free_shipping.key){
//     //                 c[i].ammount = ammount;
//     //             }
//     //         }
//     //     } else {
//     //         let new_product : cart_product = {
//     //             product: free_shipping,
//     //             ammount: ammount
//     //         }
//     //         c.push(new_product)
//     //     }
//     // } else {
//         c = c.filter(cart_product => cart_product.product.alias != 'ship')
//         // Use normal shipping
//         if(c.map(p => p.product.key).includes(regular_shipping.key)){
//             for(let i = 0; i < c.length; i++){
//                 if(c[i].product.key == regular_shipping.key){
//                     c[i].ammount = ammount;
//                 }
//             }
//         } else {
//             let new_product : cart_product = {
//                 product: regular_shipping,
//                 ammount: ammount
//             }
//             c.push(new_product)
//         }
//     // }

//     cart_contents.set(c);
// }
// export const get_line_items_to_checkout = () => {
//     if(browser){
//         check_shipping();
//         let c : cart_product[] = get(cart_contents);
//         let line_items = c.map(c => {
//             return {quantity: c.ammount, price: c.product.key}
//         });
//         if(c.length == 0){
//             return [];
//         } else {
//             return line_items;
//         }
//     } else {
//         return [];
//     }
// }
// export const check_out = () => {
//     let stripe
//     try{
//         stripe = Stripe("pk_live_51K1fDGD3LzjANe5w2MDH7mFH0HqQphzc6LppQIOm6muiUAZKgL0vupQYyHJ6g3dBrbG8FPgDlsdghtAMEgtbo72H00Mx6Wo9AU");
//     } catch (e) {
//         console.error(e)
//         alert("Unable to checkout: Try refreshing the page or using a different browser: Or email info@coloradotoffee.com: Code 102")
//     }
    
//     if(browser && stripe){
//         let line_items = get_line_items_to_checkout()
//         const { error } = stripe.redirectToCheckout({
//             lineItems: line_items,
//             shippingAddressCollection: {
//                 allowedCountries: ["US"],
//             },
//             // discounts : [{
//             //     coupon: stripe_code,
//             // }],
//             submitType: "pay",
//             mode: "payment",
//             successUrl: `https://www.coloradotoffee.com/after/`,
//             cancelUrl: `https://www.coloradotoffee.com/`,
//         });
//         if (error) {
//             alert("Something is broken! Please email info@coloradotoffee.com, Error code 103");
//         }
//     } else {
//         alert("Something is broken! Please email info@coloradotoffee.com, Error code 104");
//     }
// }

// check_shipping();



// export const get_new_checkout_items = () => {
//     if(browser){
//         check_shipping();
//         let c : cart_product[] = get(cart_contents);
//         let line_items = c.map(c => {
//             return {amount: c.ammount, id: c.product.key}
//         });
//         if(c.length == 0){
//             return [];
//         } else {
//             return line_items;
//         }
//     } else {
//         return [];
//     }
// }
// export async function new_checkout(event: Event, timeout = 500){
//     if(!new_api_healthy){
//         // Fallback to old checkout if not good
//         check_out();
//         return;
//     }


//     const interaction = {
//         t: "click",
//         d: {target: event?.target?.id}
//     }

//     try {
//         let ack = await new_socket.emitWithAck('interaction-ack', interaction)
//         // console.log("Acking Interaction post", ack)

//         let res = await fetch(`/aapii/checkout/create`,{
//             method:"POST",
//             headers:{
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(get_new_checkout_items())
//         })

//         if(res.status == 201){
//             let link = await res.text()
//             window.location.assign(link);
//         } else {
//             alert("We are unable to verify your checkout session, please try again later")
//         }
//     } catch(e) {
//         console.error(e)
//     }
// }