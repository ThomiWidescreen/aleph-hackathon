import User from "@database/models/user";

//! endpoint no probado

interface Props {
    address: string,
    name: string,
    description: string,
    hirenshiringAvailability: boolean
}

export const putUser = async ({ address, name, description, hirenshiringAvailability }: Props) => {

    const body = { name, description, hirenshiringAvailability }
    const user = await User.findByIdAndUpdate(address, body, { new: true });

    return {
        mge: 'User Updated OK',
        user
    }
}
