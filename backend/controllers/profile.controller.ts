import * as osu from 'osu-api-v2-js';
import { getApiSession } from '../session';

export const getMe = async (req: Request): Promise<Response> => {
	const url = new URL(req.url);

	if (url.pathname === '/api/me') {
		const cookie = req.headers.get('Cookie');
		const sessionId = cookie?.match(/sessionId=([^;]+)/)?.[1];

		if (!sessionId) {
			return new Response('No session', { status: 400 });
		}

		const api = getApiSession(sessionId);

		if (!api) {
			return new Response('Invalid session or session expired', {
				status: 401,
			});
		}

		const user = await api.getResourceOwner();
		console.log(api);
		console.log(user);

		if (!user) {
			return new Response('Failed to fetch user', { status: 500 });
		}

		return new Response(JSON.stringify(user), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return new Response('Not found', { status: 404 });
};
