import type { ProductType } from '$lib/interfaces';

const glp1_obj = {
	question: 'What are GLP-1 receptor research materials?',
	answer:
		'This catalog group contains compounds supplied for controlled laboratory research involving the GLP-1 receptor. These materials are for lawful laboratory research only and are not for personal use or use in or on humans or animals.',
	header: 'GLP-1 receptor research materials',
	type: 'glp1'
};

const secretagogue_obj = {
	question: 'What are peptide signaling research materials?',
	answer:
		'This catalog group contains compounds supplied for controlled laboratory research involving peptide signaling. These materials are for lawful laboratory research only and are not for personal use or use in or on humans or animals.',
	header: 'Peptide signaling research materials',
	type: 'secretagogues'
};

const peptide_obj = {
	question: 'What are peptide research materials?',
	answer:
		'This catalog group contains peptide and related compounds supplied for controlled laboratory research. These materials are for lawful laboratory research only and are not for personal use or use in or on humans or animals.',
	header: 'Peptide research materials',
	type: 'peptide'
};

export const product_types_map = new Map([
	['glp1', glp1_obj],
	['secretagogues', secretagogue_obj],
	['peptide', peptide_obj]
]);

export function get_my_type_object(type: ProductType) {
	return product_types_map.get(type);
}
