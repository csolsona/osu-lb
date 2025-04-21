import type { API } from 'osu-api-v2-js';

const apiSessions = new Map<string, API>();

export function setApiSession(sessionId: string, api: API) {
	apiSessions.set(sessionId, api);
}

export function getApiSession(sessionId: string): API | undefined {
	return apiSessions.get(sessionId);
}

export function deleteApiSession(sessionId: string) {
	apiSessions.delete(sessionId);
}
