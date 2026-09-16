// En Vercel sale el dominio de producción (el .vercel.app hoy, el propio el día
// que se conecte). En local no existe y basta con localhost.
const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const urlBase = dominio ? `https://${dominio}` : "http://localhost:3000";
