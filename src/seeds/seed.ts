import { sequelize } from '../database/index.js';
import { User } from '../models/user.js';
import { Bank } from '../models/bank.js';
import { InterestRate } from '../models/interestRate.js';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
    try {
        // Sincroniza la base de datos
        await sequelize.sync({ force: true });
        console.log('Base de datos sincronizada');

        // Crear usuarios predeterminados
        const adminUser = await User.create({
            username: 'admin',
            password: await bcrypt.hash('admin123', 10),
            role: 'ADMIN',
        });

        const regularUser = await User.create({
            username: 'user',
            password: await bcrypt.hash('user123', 10),
            role: 'USER',
        });

        console.log('Usuarios creados:', adminUser.username, regularUser.username);

        // Datos de Bancos de Chile
        const banksData = [
            { name: 'Banco de Chile', address: 'Av. Libertador Bernardo O’Higgins 123', contact: 'contacto@bancochile.cl' },
            { name: 'Banco Estado', address: 'Calle Moneda 456', contact: 'contacto@bancoestado.cl' },
            { name: 'Santander Chile', address: 'Av. Apoquindo 789', contact: 'contacto@santander.cl' },
            { name: 'Banco BCI', address: 'Calle Huérfanos 321', contact: 'contacto@bci.cl' },
            { name: 'Scotiabank Chile', address: 'Av. Providencia 654', contact: 'contacto@scotiabank.cl' },
        ];

        // Crear bancos
        const banks = await Promise.all(
            banksData.map((bank) => Bank.create(bank))
        );
        console.log('Bancos creados:', banks.map((bank) => bank.name));

        // Crear tasas de interés asociadas
        const interestRatesData = [
            { bankId: banks[0].id, annualPercentage: 4.2 },
            { bankId: banks[0].id, annualPercentage: 3.8 },
            { bankId: banks[1].id, annualPercentage: 5.0 },
            { bankId: banks[2].id, annualPercentage: 4.5 },
            { bankId: banks[3].id, annualPercentage: 4.0 },
            { bankId: banks[4].id, annualPercentage: 3.9 },
        ];

        await Promise.all(
            interestRatesData.map((rate) =>
                InterestRate.create({ ...rate, lastModified: new Date() })
            )
        );
        console.log('Tasas de interés creadas');

        console.log('Seed completado exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al ejecutar el seed:', error);
        process.exit(1);
    }
};

seedDatabase();
