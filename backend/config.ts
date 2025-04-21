import { config as load } from 'dotenv';
import path from 'path';

const envPath = path.join(import.meta.dir, '../.env');
load({ path: envPath });

const requiredEnvVars = [
	'OSU_CLIENT_ID',
	'OSU_CLIENT_SECRET',
	'OSU_REDIRECT_URI',
];

for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.error(`Missing required environment variable: ${envVar}`);
		process.exit(1);
	}
}

export const config = {
	osu: {
		clientId: Bun.env.OSU_CLIENT_ID,
		clientSecret: Bun.env.OSU_CLIENT_SECRET,
		redirectUri: Bun.env.OSU_REDIRECT_URI,
	},
} as const;
