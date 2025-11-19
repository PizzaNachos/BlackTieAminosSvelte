import { browser } from "$app/environment";
import { get, writable, readable } from 'svelte/store';

export let reviews_store = writable([
    // {
    //     "id": 1,
    //     "name": "Tegan C.",
    //     "review_text": "Just got my first (of many) order of toffee.  We got the Salted Chocolate Almond and Milk Chocolate Almond.  Both were DELICIOUS!  They came in a timely manner, in  an adorable box, which makes me think this is a great gift idea and amazing!  I give this an A++ and will be ordering again soon!",
    //     "toffee_key": ["salted", "milk"],
    //     "rating": 5,
    //     "date": "2022-04-01 23:56:21",
    //     "featured": true,
    // },
])

let reviews_map = new Map();
let revs = get(reviews_store)
for (let i = 0; i < revs.length; i++) {
    let review = revs[i];
    for (let j = 0; j < review.toffee_key.length; j++) {
        reviews_map.set(review.toffee_key[j], review);
    }
}

export let get_reviews_for_product = (alias: string) => {
    return reviews_map.get(alias)
}
