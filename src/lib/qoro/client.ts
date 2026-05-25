import { app_config } from '$lib/config.js';
// @ts-ignore — JS SDK without type declarations.
import QoroClient from './QoroClient.js';

const { store_uuid: storeUuid, base_url: baseUrl } = app_config.qoro;

export const qoro = new QoroClient(storeUuid, { baseUrl });
export { QoroClient };
