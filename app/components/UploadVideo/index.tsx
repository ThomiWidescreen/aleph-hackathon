"use client";

import { uploadFile } from "@/app/api/helpers/uploadFile";
import { useEffect, useState } from "react";

export default function UploadVideo() {
    // Estado tipado como string | null
    const [base64Video, setBase64Video] = useState<string | null>(null);

    // useEffect(() => {
    //     if (base64Video) {
    //       uploadFile (base64Video); // Se ejecuta cuando base64Video cambia
    //     }
    //   }, [base64Video]);

    // Función para manejar el cambio de archivo, con el evento tipado
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Casteamos el resultado como string
                const result = event.target?.result as string;
                setBase64Video(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={handleFileChange} />
        </div>
    );
}