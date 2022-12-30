import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../../.env' });

export const AchievmentSeed = [
    {
        type: 'sliver',
        icon: process.env.SERVER_HOST + '/uploads/silver.webp',
        description: 'silver',
        level: 16
    },
    {
        type: 'gold',
        icon: process.env.SERVER_HOST + '/uploads/gold.webp',
        description: 'gold',
        level: 48
    },
    {
        type: 'platinum',
        icon: process.env.SERVER_HOST + '/uploads/platinum.webp',
        description: 'platinum',
        level: 256
    },
    {
        type: 'bronze',
        icon: process.env.SERVER_HOST + '/uploads/bronze.png',
        description: 'bronze',
        level: 1
    },
]