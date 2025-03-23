"use server"

import Video, { IVideo } from "@database/models/video";

export const getVideosByAuthor = async( authorAddress: string ) => {

    const videos = await Video.find({ authorAddress }) as IVideo[];

    return videos || [];
}