import { InterestRate } from '../models/interestRate.js';

class SimulationService {
    async simulateSavings(bankId: number, principal: number, years: number): Promise<{ earnings: number; finalAmount: number; annualPercentage: number }> {
        // Busca la tasa de interés más reciente asociada al banco
        const interestRate = await InterestRate.findOne({
            where: { bankId },
            order: [['lastModified', 'DESC']], // Ordenar por fecha de modificación descendente
        });

        if (!interestRate) {
            throw new Error('Interest rate not found for the given bank');
        }

        const annualRate = interestRate.annualPercentage / 100;

        // Fórmula del interés compuesto
        const finalAmount = principal * Math.pow(1 + annualRate, years);
        const earnings = finalAmount - principal;

        return {
            earnings,
            finalAmount,
            annualPercentage: interestRate.annualPercentage
        };
    }
}

export default new SimulationService();
