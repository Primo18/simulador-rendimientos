import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Bank } from './bank.js';

@Table({
    tableName: 'InterestRates',
    timestamps: true,
})
export class InterestRate extends Model {
    @ForeignKey(() => Bank)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    bankId!: number;

    @BelongsTo(() => Bank)
    bank!: Bank | null;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    annualPercentage!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    lastModified!: Date;
}