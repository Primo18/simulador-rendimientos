import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import InterestRate from './interestRate.js';

@Table({
    tableName: 'Banks',
    timestamps: true,
})
class Bank extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    contact!: string;

    @HasMany(() => InterestRate)
    interestRates!: InterestRate[];
}

export default Bank;
