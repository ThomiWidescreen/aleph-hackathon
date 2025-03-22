"use server";

import { v2 } from 'cloudinary';

// Configuration
export const cloudinary = v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Función para verificar la conexión
export const verifyCloudinaryConnection = async (): Promise<boolean> => {
    try {
        // Intentamos hacer una llamada básica a la API para verificar credenciales
        const result = await cloudinary.api.ping();
        console.log("✅ Conexión a Cloudinary exitosa:", result.status);
        return true;
    } catch (error) {
        console.error("❌ Error de conexión a Cloudinary:", error);
        return false;
    }
};
