"use server"

import Video from "@database/models/video";

export const getVideosByAuthor = async( authorAddress: string ) => {

    const videos = await Video.find({ authorAddress });

    if (!videos) {
        return null;
    }

    return ({
        messaje: 'OK Get Videos',
        videos
    })
}