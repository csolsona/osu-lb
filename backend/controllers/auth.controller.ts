import * as osu from 'osu-api-v2-js';
import { config } from '../config';
import { setApiSession } from '../session';

const id = parseInt(config.osu.clientId!); // as a number
const secret = config.osu.clientSecret!;
const redirect_uri = config.osu.redirectUri!;

export const getToken = async (req: Request): Promise<Response> => {
	const body: any = await req.json();
	const code = body.code;

	if (!code) {
		return new Response('Missing code', { status: 400 });
	}

	const api = await osu.API.createAsync(id, secret!, { redirect_uri, code });

	if (!api) {
		return new Response('Missing response', { status: 400 });
	}

	const sessionId = crypto.randomUUID();
	setApiSession(sessionId, api);

	console.log(api.refresh_token);
	return new Response(JSON.stringify(api), {
		headers: {
			'Content-Type': 'application/json',
			'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Path=/; SameSite=Lax`,
		},
	});
};

export const getAuthorizationURL = async (req: Request): Promise<Response> => {
	const url = new URL(req.url);

	if (url.pathname === '/api/authorization-url') {
		const authUrl = osu.generateAuthorizationURL(id, redirect_uri, [
			'identify',
			'public',
		]);

		return new Response(JSON.stringify({ url: authUrl }), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return new Response('Not found', { status: 404 });
};
