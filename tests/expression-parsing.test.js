/**
 * Calculator Engine Test Suite - Expression Parsing and Operator Precedence
 * 
 * Issue #2: Expression Parsing and Operator Precedence
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { Calculator } from '../src/scripts/calculator.js';

describe('Calculator - Expression Parsing and Operator Precedence', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    describe('Operator Precedence', () => {
        test('should respect multiplication before addition', () => {
            expect(calc.evaluate('2 + 3 * 4')).toBe('14'); // 2 + 12 = 14
        });

        test('should respect division before subtraction', () => {
            expect(calc.evaluate('10 - 6 / 2')).toBe('7'); // 10 - 3 = 7
        });

        test('should respect multiplication before subtraction', () => {
            expect(calc.evaluate('10 - 2 * 3')).toBe('4'); // 10 - 6 = 4
        });

        test('should handle multiple operations with precedence', () => {
            expect(calc.evaluate('2 + 3 * 4 - 5')).toBe('9'); // 2 + 12 - 5 = 9
        });
    });

    describe('Parentheses', () => {
        test('should handle simple parentheses', () => {
            expect(calc.evaluate('(2 + 3) * 4')).toBe('20');
        });

        test('should handle parentheses changing precedence', () => {
            expect(calc.evaluate('2 * (3 + 4)')).toBe('14');
        });

        test('should handle multiple parentheses', () => {
            expect(calc.evaluate('(2 + 3) * (4 + 5)')).toBe('45');
        });

        test('should handle nested parentheses', () => {
            expect(calc.evaluate('((2 + 3) * 4) - 5')).toBe('15');
        });

        test('should handle deeply nested parentheses', () => {
            expect(calc.evaluate('2 * (3 + (4 * 5))')).toBe('46');
        });

        test('should handle parentheses with division', () => {
            expect(calc.evaluate('(10 + 5) / 3')).toBe('5');
        });
    });

    describe('Complex Expressions', () => {
        test('should handle complex expression with all operations', () => {
            expect(calc.evaluate('(2 + 3) * 4 - 10 / 2')).toBe('15'); // 20 - 5 = 15
        });

        test('should handle expression with multiple levels', () => {
            expect(calc.evaluate('((2 + 3) * (4 - 1)) / 3')).toBe('5'); // (5 * 3) / 3 = 5
        });
    });

    describe('Parentheses Validation', () => {
        test('should return Error for mismatched opening parenthesis', () => {
            expect(calc.evaluate('(2 + 3')).toBe('Error');
        });

        test('should return Error for mismatched closing parenthesis', () => {
            expect(calc.evaluate('2 + 3)')).toBe('Error');
        });

        test('should return Error for multiple mismatched parentheses', () => {
            expect(calc.evaluate('((2 + 3)')).toBe('Error');
        });

        test('should handle empty parentheses', () => {
            expect(calc.evaluate('()')).toBe('Error');
        });

        test('should handle only parentheses around number', () => {
            expect(calc.evaluate('(((5)))')).toBe('5');
        });
    });
});
