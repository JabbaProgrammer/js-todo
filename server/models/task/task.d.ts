import {
    DataTypes,
    Sequelize,
    Model,
    ModelCtor,
    Optional,
} from 'sequelize';

import { UserInstance } from '../user/user';

export interface TaskAttributes {
    id: string;
    name: string;
    description: string;
    complete: boolean;
    user_id: string;
}

export type taskCreationAttributes = Optional<TaskAttributes, 'id'>;

export interface TaskInstance extends Model<TaskAttributes, taskCreationAttributes>, TaskAttributes {
    readonly createdAt: Date;
    readonly updatedAt: Date;
    user: UserInstance;
}