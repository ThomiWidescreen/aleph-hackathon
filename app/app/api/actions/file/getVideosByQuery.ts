"use server"

import Video from "@database/models/video";

interface Props {
    query: string
}

export const getVideosByQuery = async({query}: Props) => {


     try {
            const regexp = new RegExp(query, 'i');
    
            const videos = await Video.find({
                $or: [{ title: regexp }, { description: regexp }, { tags: regexp }],
                // $and: [{ state: true }]
            });
    
            return {
                message: 'Get Videos Ok',
                videos: videos || []
            }
    
        } catch (error) {
            return { error: 'Error al buscar user' }
        }
}