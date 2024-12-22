import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    Sequelize,
} from 'sequelize-typescript';
import Bank from './bank.js';

@Table({
    tableName: 'InterestRates',
    timestamps: true,
})
class InterestRate extends Model {
    @ForeignKey(() => Bank) // Función diferida para evitar dependencias circulares
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    bankId!: number;

    @BelongsTo(() => Bank) // Función diferida
    bank!: Bank;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    annualPercentage!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    })
    lastModified!: Date;
}

export default InterestRate;
