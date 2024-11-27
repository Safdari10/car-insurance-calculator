// Defines data structures, database schemas, or models.
// New file: Contains business logic and validation
export interface CarValueRequest {
    model: string;
    year: number;
}

export class CarValueModel {
    private static readonly MIN_YEAR = 1886; // First automobile patent
    
    static validateInput(model: string, year: number): string | null {
        if (!model?.trim()) {
            return 'Model name is required';
        }

        if (!/^[a-zA-Z0-9-\s]{1,50}$/.test(model)) {
            return 'Invalid model name format';
        }

        if (!Number.isInteger(year)) {
            return 'Year must be an integer';
        }

        if (year < this.MIN_YEAR || year > new Date().getFullYear()) {
            return 'Invalid year';
        }

        return null;
    }

    static calculateValue(model: string, year: number): number {
        const alphabetValue = model
            .replace(/[^a-zA-Z]/g, '')
            .toUpperCase()
            .split('')
            .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

        return alphabetValue * 100 + year;
    }
}