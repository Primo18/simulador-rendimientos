import Bank from '../models/bank.js';

class BankService {
    async getAllBanks() {
        return await Bank.findAll();
    }

    async getBankById(id: number) {
        const bank = await Bank.findByPk(id);
        if (!bank) throw new Error('Bank not found');
        return bank;
    }

    async createBank(data: { name: string; address: string; contact: string }) {
        return await Bank.create(data);
    }

    async updateBank(
        id: number,
        data: { name?: string; address?: string; contact?: string }
    ) {
        const bank = await this.getBankById(id);
        return await bank.update(data);
    }

    async deleteBank(id: number) {
        const bank = await this.getBankById(id);
        await bank.destroy();
        return { message: 'Bank deleted successfully' };
    }
}

export default new BankService();
