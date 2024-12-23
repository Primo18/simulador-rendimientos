import { InterestRate } from '../models/interestRate.js';

class InterestRateService {
    async getAllInterestRates() {
        return await InterestRate.findAll({ include: ['bank'] });
    }

    async getInterestRateById(id: number) {
        const rate = await InterestRate.findByPk(id, { include: ['bank'] });
        if (!rate) throw new Error('InterestRate not found');
        return rate;
    }

    async createInterestRate(data: { bankId: number; annualPercentage: number }) {
        return await InterestRate.create({
            ...data,
            lastModified: new Date(),
        });
    }

    async updateInterestRate(
        id: number,
        data: { annualPercentage?: number }
    ) {
        const rate = await this.getInterestRateById(id);
        return await rate.update({
            ...data,
            lastModified: new Date(),
        });
    }

    async deleteInterestRate(id: number) {
        const rate = await this.getInterestRateById(id);
        await rate.destroy();
        return { message: 'InterestRate deleted successfully' };
    }
}

export default new InterestRateService();
