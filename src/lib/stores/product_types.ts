import { browser } from "$app/environment";
import type { ProductType, product } from "$lib/interfaces";
import { get, writable, readable } from 'svelte/store';
import { get_reviews_for_product } from "./reviews";

let what_is_toffee = `GLP-1 agonists are advanced research peptides designed to engage the GLP-1 receptor,
     a key regulator in metabolic signaling. In laboratory settings, these compounds help illuminate pathways 
     tied to glucose balance, energy regulation, and metabolic performance.`
let toffee_question = "What is a GLP1 Agonist?"
let glp1_obj = {
    question: toffee_question,
    answer: what_is_toffee,
    header: "GLP1 agonist family of compounds",
    type: "glp1"
}


let what_is_brittle = `A secretagogue is a compound that stimulates a body’s natural secretion of a specific hormone or signaling molecule. 
In research settings, secretagogues are used to explore how cells regulate hormonal release, respond to stimuli, 
and maintain metabolic balance. At Black Tie Aminos, secretagogues are provided in their purest, research - 
grade form—engineered exclusively for controlled scientific investigation and never for human use.`
let brittle_question = "What is a Secretagogue?"
let brittle_obj = {
    question: brittle_question,
    answer: what_is_brittle,
    header: "Secretagogue family of comopounds",
    type: "secretagogues"
}

let what_is_butterscotch = `A peptide is a precise chain of amino acids—the fundamental building blocks of protein—crafted by nature to carry out highly specific biological signals.In research settings, peptides offer a refined way to study cellular communication, metabolic pathways, and targeted molecular interactions.At Black Tie Aminos, peptides are presented in their purest form, engineered exclusively for controlled scientific investigation and never for human use.`
let butterscotch_question = "What is a Peptide?"
let butterscotch_obj = {
    question: butterscotch_question,
    answer: what_is_butterscotch,
    header: "Peptides and research compounds?",
    type: "peptide"
}


export let product_types_map = new Map([
    ['glp1', glp1_obj],
    ['secretagogues', brittle_obj],
    ['peptide', butterscotch_obj]
])

export function get_my_type_object(type: ProductType) {
    return product_types_map.get(type)
}