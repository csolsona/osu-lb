import { routes } from './routes.ts';
import { CookieMap } from 'bun';

Bun.serve({
	port: 3000,
	async fetch(req) {
		const url = new URL(req.url);
		const cookies = new CookieMap();

		console.log('Incoming request:', req.method, url.pathname);
		const route = routes[url.pathname as keyof typeof routes];
		if (route && req.method === route.method) {
			return route.handler(req);
		}

		// API Ejemplo
		if (url.pathname === '/api/hello' && req.method === 'GET') {
			return new Response(
				JSON.stringify({ message: 'Hola desde Bun!' }),
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// En producción: Sirve archivos estáticos del frontend
		if (process.env.NODE_ENV === 'production') {
			try {
				const file = Bun.file(`../frontend/dist${url.pathname}`);
				if (await file.exists()) return new Response(file);
			} catch (e) {
				console.error(e);
			}
		}

		return new Response('Ruta no encontrada', { status: 404 });
	},
});

console.log(`🚀 Servidor Bun corriendo en http://localhost:3000`);
