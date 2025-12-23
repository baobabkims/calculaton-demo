/**
 * Calculator Engine Test Suite - Error Handling
 * 
 * Issue #3: Error Handling Implementation
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { Calculator } from '../src/scripts/calculator.js';

describe('Calculator - Error Handling', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    describe('Division by Zero', () => {
        test('should return Error when dividing by zero', () => {
            expect(calc.evaluate('1 / 0')).toBe('Error');
        });

        test('should return Error when dividing by zero with ÷', () => {
            expect(calc.evaluate('10 ÷ 0')).toBe('Error');
        });

        test('should return Error for complex expression with division by zero', () => {
            expect(calc.evaluate('(5 + 5) / (2 - 2)')).toBe('Error');
        });
    });

    describe('Invalid Mathematical Operations', () => {
        test('should return Error for square root of negative number', () => {
            expect(calc.evaluate('sqrt(-1)')).toBe('Error');
        });

        test('should return Error for log of negative number', () => {
            expect(calc.evaluate('log(-10)')).toBe('Error');
        });

        test('should return Error for log of zero', () => {
            expect(calc.evaluate('log(0)')).toBe('Error');
        });
    });

    describe('Invalid Syntax', () => {
        test('should return Error for double operators', () => {
            expect(calc.evaluate('2 + + 3')).toBe('Error');
        });

        test('should return Error for trailing operator', () => {
            expect(calc.evaluate('2 + 3 +')).toBe('Error');
        });

        test('should return Error for leading operator (except minus)', () => {
            expect(calc.evaluate('+ 2 + 3')).toBe('Error');
        });

        test('should return Error for invalid characters', () => {
            expect(calc.evaluate('2 + abc')).toBe('Error');
        });

        test('should return Error for empty expression', () => {
            expect(calc.evaluate('')).toBe('Error');
        });

        test('should return Error for only spaces', () => {
            expect(calc.evaluate('   ')).toBe('Error');
        });
    });

    describe('Overflow and Underflow', () => {
        test('should handle very large numbers', () => {
            const result = calc.evaluate('10^308');
            // Should either return a number or Error, but not crash
            expect(typeof result).toBe('string');
        });

        test('should return Error for overflow to Infinity', () => {
            const result = calc.evaluate('10^1000');
            expect(result).toBe('Error');
        });
    });

    describe('Edge Cases', () => {
        test('should not crash on malformed expressions', () => {
            expect(() => calc.evaluate('2 + * 3')).not.toThrow();
            expect(calc.evaluate('2 + * 3')).toBe('Error');
        });

        test('should handle expressions with only operators', () => {
            expect(calc.evaluate('+ - * /')).toBe('Error');
        });

        test('should handle null or undefined gracefully', () => {
            expect(calc.evaluate(null)).toBe('Error');
            expect(calc.evaluate(undefined)).toBe('Error');
        });
    });
});
