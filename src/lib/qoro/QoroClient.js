// @ts-nocheck
// ES module usage:
//   import QoroClient from './QoroClient.js';
//   const qoro = new QoroClient('store-uuid', { baseUrl: 'https://qoro.vyrelabs.com' });
//
// Single-file HTML usage:
//   Paste this file into a normal <script> tag and delete the final
//   `export default QoroClient;` line.
//
// Methods:
//   fetchOrgSettings()                  — GET /settings  (storefront config, terminology, readiness)
//   fetchProducts()                     — GET /products  (each product includes storefront_metadata: {string: string})
//   getProductById(id)                  — GET /products/:id
//   fetchCollections()                  — GET /collections  (visible collections + product memberships)
//   checkoutUnpaid(payload)             — POST /checkout/unpaid
//   checkoutPaid(payload, { redirect }) — POST /checkout/paid

const DEFAULT_BASE_URL = 'https://qoro.vyrelabs.com';

class QoroApiError extends Error {
	constructor(message, { status, body } = {}) {
		super(message);
		this.name = 'QoroApiError';
		this.status = status ?? 0;
		this.body = body;
	}
}

class QoroClient {
	constructor(storeUuid, options = {}) {
		if (!storeUuid || typeof storeUuid !== 'string') {
			throw new TypeError('QoroClient requires a store UUID string.');
		}

		const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
		if (!baseUrl || typeof baseUrl !== 'string') {
			throw new TypeError('QoroClient baseUrl must be a string when provided.');
		}

		this.storeUuid = storeUuid;
		this.baseUrl = baseUrl.replace(/\/+$/, '');
		this.fetch = options.fetch ?? globalThis.fetch?.bind(globalThis);

		if (typeof this.fetch !== 'function') {
			throw new Error('QoroClient requires a fetch implementation.');
		}
	}

	fetchOrgSettings() {
		return this.#request('/settings');
	}

	fetchProducts() {
		return this.#request('/products');
	}

	getProductById(productId) {
		if (productId === undefined || productId === null || productId === '') {
			throw new TypeError('getProductById requires a product ID.');
		}

		return this.#request(`/products/${encodeURIComponent(String(productId))}`);
	}

	fetchCollections() {
		return this.#request('/collections');
	}

	checkoutUnpaid(payload) {
		return this.#request('/checkout/unpaid', {
			method: 'POST',
			body: payload
		});
	}

	async checkoutPaid(payload, { redirect = false } = {}) {
		const result = await this.#request('/checkout/paid', {
			method: 'POST',
			body: payload
		});

		if (redirect) {
			if (!result?.checkout_url) {
				throw new QoroApiError('Paid checkout did not return a checkout URL.', {
					status: 0,
					body: result
				});
			}

			if (!globalThis.location) {
				throw new Error('checkoutPaid redirect requires a browser-like location object.');
			}

			globalThis.location.href = result.checkout_url;
		}

		return result;
	}

	#url(path) {
		return `${this.baseUrl}/api/public/${encodeURIComponent(this.storeUuid)}${path}`;
	}

	async #request(path, { method = 'GET', body, headers = {} } = {}) {
		const requestHeaders = {
			Accept: 'application/json',
			...headers
		};
		const init = {
			method,
			headers: requestHeaders
		};

		if (body !== undefined) {
			requestHeaders['Content-Type'] = 'application/json';
			init.body = JSON.stringify(body);
		}

		const response = await this.fetch(this.#url(path), init);
		const parsedBody = await this.#parseBody(response);

		if (!response.ok) {
			throw new QoroApiError(this.#errorMessage(parsedBody, response.status), {
				status: response.status,
				body: parsedBody
			});
		}

		return parsedBody;
	}

	async #parseBody(response) {
		const text = await response.text();
		if (!text) return null;

		const contentType = response.headers?.get?.('content-type') ?? '';
		const looksJson = /^[\[{]/.test(text.trim());

		if (contentType.includes('application/json') || looksJson) {
			try {
				return JSON.parse(text);
			} catch {
				return text;
			}
		}

		return text;
	}

	#errorMessage(body, status) {
		if (typeof body === 'string' && body.trim()) return body;
		if (body && typeof body.error === 'string') return body.error;
		if (body && typeof body.message === 'string') return body.message;
		return `Qoro API request failed with status ${status}.`;
	}
}

QoroClient.ApiError = QoroApiError;

export default QoroClient;
