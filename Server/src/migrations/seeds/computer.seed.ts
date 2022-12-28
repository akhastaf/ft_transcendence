import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../../.env' });

export const ComputerSeed = {
    username: process.env.COMP_USERNAME,
    email: process.env.COMP_EMAIL,
    avatar: process.env.SERVER_HOST + '/uploads/' + process.env.COMP_AVATAR,
}