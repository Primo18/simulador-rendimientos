import sequelize from './database/index.js';

(async () => {
    try {
        console.log("Sincronizando modelos con la base de datos...");
        await sequelize.sync({ alter: true });
        console.log("Modelos sincronizados correctamente.");
        process.exit(0);
    } catch (error) {
        console.error("Error al sincronizar modelos:", error);
        process.exit(1);
    }
})();
