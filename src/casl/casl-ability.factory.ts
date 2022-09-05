import { Ability, InferSubjects } from "@casl/ability";
import { Achievment } from "src/achievment/entities/achievment.entity";
import { Game } from "src/game/entites/game.entity";
import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";


export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User | typeof Game | typeof Achievment | typeof Room> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export class CaslAbilityFactory {}
