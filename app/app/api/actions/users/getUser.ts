"use server"

import User from "@database/models/user";

interface Props {
    address: string
}


export const getUser = async({ address }: Props) => {
    console.log({address})
    
    try {
        const user = await User.findOne({ address });
        if (!user) {
            throw new Error(`No user found with wallet address: ${address}`);
        }
        return {
            message: 'OK',
            user
        }

    } catch (error) {
        return { error: 'Error al buscar user' }
    }
    }