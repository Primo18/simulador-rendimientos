import Log from '../models/log.js';

class LogService {
    async createLog(action: string, userId: number, previousData?: object, newData?: object) {
        return await Log.create({
            action,
            userId,
            previousData: previousData ? JSON.stringify(previousData) : null,
            newData: newData ? JSON.stringify(newData) : null,
        });
    }

    async getLogs() {
        return await Log.findAll();
    }
}

export default new LogService();
