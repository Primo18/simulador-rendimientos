import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.js';

@Table({
    tableName: 'Logs',
    timestamps: true,
})
export class Log extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    action!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User | null;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    previousData?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    newData?: string;
}
