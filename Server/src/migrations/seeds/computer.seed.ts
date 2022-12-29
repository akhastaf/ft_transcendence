import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../../.env' });

export const ComputerSeed = {
    nickname: process.env.COMP_USERNAME,
    username: process.env.COMP_USERNAME,
    email: process.env.COMP_EMAIL,
    avatar: process.env.SERVER_HOST + '/uploads/' + process.env.COMP_AVATAR,
}



// public async up(queryRunner: QueryRunner): Promise<void> {
//     const computer = queryRunner.manager.getRepository(User).create(ComputerSeed);
//     await queryRunner.manager.getRepository(User).save(computer);
// }

// public async down(queryRunner: QueryRunner): Promise<void> {
//     // await queryRunner.clearTable('achievment');
// }

// public async up(queryRunner: QueryRunner): Promise<void> {
//     const achivments = queryRunner.manager.getRepository(Achievment).create(AchievmentSeed);
//     await queryRunner.manager.getRepository(Achievment).save(achivments);
// }

// public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.clearTable('achievment');
// }