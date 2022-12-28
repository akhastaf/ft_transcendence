import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../../.env' });

export const AchievmentSeed = [
    {
        type: 'sliver',
        icon: process.env.SERVER_HOST + '/uploads/silver.webp',
        description: 'silver',
        win: 15,
        loss: 2,
        level: 3
    },
    {
        type: 'gold',
        icon: process.env.SERVER_HOST + '/uploads/gold.webp',
        description: 'gold',
        win: 10,
        loss: 2,
        level: 3
    },
    {
        type: 'platinum',
        icon: process.env.SERVER_HOST + '/uploads/platinum.webp',
        description: 'platinum',
        win: 10,
        loss: 2,
        level: 3
    },
    {
        type: 'bronze',
        icon: process.env.SERVER_HOST + '/uploads/bronze.png',
        description: 'bronze',
        win: 10,
        loss: 2,
        level: 3
    },
]