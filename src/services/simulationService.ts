import InterestRate from '../models/interestRate.js';

class SimulationService {
    async simulateSavings(bankId: number, principal: number, years: number): Promise<{ earnings: number; finalAmount: number }> {
        // Busca la tasa de interés asociada al banco
        const interestRate = await InterestRate.findOne({ where: { bankId } });
        if (!interestRate) throw new Error('Interest rate not found for the given bank');

        const annualRate = interestRate.annualPercentage / 100;

        // Fórmula del interés compuesto
        const finalAmount = principal * Math.pow(1 + annualRate, years);
        const earnings = finalAmount - principal;

        return { earnings, finalAmount };
    }
}

export default new SimulationService();
