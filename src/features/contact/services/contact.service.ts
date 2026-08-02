import { ROUTES_API } from '@/constants/routes.api';
import { apiClient } from '@/lib/axios';

import type { ContactInput } from '../schema';

/** Envía el formulario al BFF. El navegador nunca habla directo con el backend. */
export async function sendContactMessage(input: ContactInput): Promise<void> {
  await apiClient.post(ROUTES_API.contact, input);
}
