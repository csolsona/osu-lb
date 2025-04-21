import {
	getAuthorizationURL,
	getToken,
} from './controllers/auth.controller.ts';
import { getMe } from './controllers/profile.controller.ts';

export const routes = {
	'/api/authorization-url': {
		method: 'GET',
		handler: getAuthorizationURL,
	},

	'/api/token': {
		method: 'POST',
		handler: getToken,
	},

	'/api/me': {
		method: 'GET',
		handler: getMe,
	},
} as const;
