import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Log } from './log.js';

@Table({
    tableName: 'Users',
    timestamps: true,
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.ENUM('USER', 'ADMIN'),
        allowNull: false,
        defaultValue: 'USER',
    })
    role!: 'USER' | 'ADMIN';

    @HasMany(() => Log, { foreignKey: 'userId' })
    logs!: Log[] | null;
}
