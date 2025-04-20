Bun.serve({
    port: 3000,
    async fetch(req) {
      const url = new URL(req.url);
      
      // API Ejemplo
      if (url.pathname === "/api/hello" && req.method === "GET") {
        return new Response(JSON.stringify({ message: "Hola desde Bun!" }), {
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // En producción: Sirve archivos estáticos del frontend
      if (process.env.NODE_ENV === "production") {
        try {
          const file = Bun.file(`../frontend/dist${url.pathname}`);
          if (await file.exists()) return new Response(file);
        } catch (e) {
          console.error(e);
        }
      }
  
      return new Response("Ruta no encontrada", { status: 404 });
    },
  });
  
  console.log(`🚀 Servidor Bun corriendo en http://localhost:3000`);