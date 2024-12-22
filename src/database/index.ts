import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from '../config/env.js';
import Bank from '../models/bank.js';
import InterestRate from '../models/interestRate.js';
import User from '../models/user.js';
import Log from '../models/log.js';

const sequelize = new Sequelize({
    database: dbConfig.database,
    dialect: 'mysql',
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    models: [Bank, InterestRate, User, Log],
});

export default sequelize;
