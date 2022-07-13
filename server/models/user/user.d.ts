import {
    DataTypes,
    Sequelize,
    Model,
    Optional,
} from 'sequelize';
import { TaskInstance } from '../task/task';
  
export interface UserAttributes {
    id: string;
    email: string;
    password: string;
}

export type userCreateAttributes = Optional<UserAttributes, 'id'>

export interface UserInstance extends Model<UserAttributes, userCreateAttributes>, UserAttributes {
    readonly createdAt: Date;
    readonly updatedAt: Date;
    tasks: TaskInstance[];
}