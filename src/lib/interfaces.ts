export interface ReviewInterface {
    id: number,
    user_name: string,
    rating: number,
    product_id: string,
    date: string,
    review_text: string,
    featured: boolean
}

export interface product {
    id: number,
    stripe_key: string,
    name: string,
    short_desc?: string,
    out_of_stock?: boolean,
    long_desc: string[],
    price: number,
    unit: string,
    alias: string,
    annotation?: string,
    product_image_url_paths: string[],
    featured_image_url_paths: string[],
    product_type?: ProductType,
    coa_path?: string,
    published: boolean,
    multi?: boolean,
    items?: product[]
}

export interface cart_product {
    product: product,
    ammount: number
}

export interface user_profile_object {
    user_email: string,
    id: number,
    name?: string,
    user_birthday?: string,
}

export interface user_profile_wrapper {
    error?: string,
    user?: user_profile_object
}

export interface filter_definition {
    max_values?: number,
    featured?: boolean,
    stars?: number[],
    date?: {
        start: string,
        end: string
    },
    product_key?: string
}

export enum ProductType {
    glp1 = 'glp1',
    secretagogues = 'secretagogues',
    peptide = "peptide"
    // butterscotch = 'butterscotch'
}