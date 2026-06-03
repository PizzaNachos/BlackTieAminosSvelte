export const RESEARCH_USE_AGREEMENT_VERSION = 'ruo-2026-05-31';

export const RESEARCH_USE_AGREEMENT_TEXT =
	'I certify that this request is exclusively for lawful laboratory research, not personal use. I will not administer, inject, ingest, or otherwise use these products in or on humans or animals, and I will comply with all applicable laws and regulations.';

export const RESEARCH_USE_RESTRICTIONS_TEXT =
	'Products are sold exclusively for lawful laboratory research. Not for personal use, human or animal consumption, administration, injection, diagnostic use, therapeutic use, clinical use, or veterinary use.';

export function researchUseAgreementNote(acceptedAt: Date = new Date()): string {
	return [
		`Research use agreement accepted: ${RESEARCH_USE_AGREEMENT_TEXT}`,
		`Research use agreement version: ${RESEARCH_USE_AGREEMENT_VERSION}`,
		`Research use agreement accepted at (UTC): ${acceptedAt.toISOString()}`
	].join('\n');
}
