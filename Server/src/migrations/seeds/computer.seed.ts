import { User } from "src/user/entities/user.entity";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../../.env' });

export const ComputerSeed = {
    username: 'PongPirate',
    email: 'pongpirate@pong.com',
    avatar: process.env.SERVER_HOST + '/uploads/pirate-pong-avatar.jpeg',
}