/**
 * Calculator Engine Test Suite
 * 
 * Following TDD methodology:
 * 🔴 Red: Write failing tests
 * 🟢 Green: Minimal implementation
 * 🔵 Refactor: Apply SOLID principles
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { Calculator } from '../src/scripts/calculator.js';

describe('Calculator - Basic Arithmetic Operations', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    describe('Addition', () => {
        test('should add two positive numbers', () => {
            expect(calc.evaluate('2 + 3')).toBe('5');
        });

        test('should add decimal numbers', () => {
            expect(calc.evaluate('1.5 + 2.5')).toBe('4');
        });

        test('should add negative numbers', () => {
            expect(calc.evaluate('-5 + 3')).toBe('-2');
        });
    });

    describe('Subtraction', () => {
        test('should subtract two numbers', () => {
            expect(calc.evaluate('10 - 5')).toBe('5');
        });

        test('should subtract decimal numbers', () => {
            expect(calc.evaluate('5.5 - 2.3')).toBe('3.2');
        });

        test('should handle negative results', () => {
            expect(calc.evaluate('3 - 5')).toBe('-2');
        });
    });

    describe('Multiplication', () => {
        test('should multiply two numbers', () => {
            expect(calc.evaluate('3 * 4')).toBe('12');
        });

        test('should multiply with × symbol', () => {
            expect(calc.evaluate('3 × 4')).toBe('12');
        });

        test('should multiply decimal numbers', () => {
            expect(calc.evaluate('2.5 * 4')).toBe('10');
        });

        test('should multiply by zero', () => {
            expect(calc.evaluate('5 * 0')).toBe('0');
        });
    });

    describe('Division', () => {
        test('should divide two numbers', () => {
            expect(calc.evaluate('15 / 3')).toBe('5');
        });

        test('should divide with ÷ symbol', () => {
            expect(calc.evaluate('15 ÷ 3')).toBe('5');
        });

        test('should divide decimal numbers', () => {
            expect(calc.evaluate('7.5 / 2.5')).toBe('3');
        });

        test('should return Error when dividing by zero', () => {
            expect(calc.evaluate('10 / 0')).toBe('Error');
        });

        test('should return Error when dividing by zero with ÷', () => {
            expect(calc.evaluate('10 ÷ 0')).toBe('Error');
        });
    });

    describe('Edge Cases', () => {
        test('should handle very large numbers', () => {
            expect(calc.evaluate('999999 + 1')).toBe('1000000');
        });

        test('should handle very small decimals', () => {
            expect(calc.evaluate('0.1 + 0.2')).toBe('0.3');
        });

        test('should handle zero operations', () => {
            expect(calc.evaluate('0 + 0')).toBe('0');
            expect(calc.evaluate('0 - 0')).toBe('0');
            expect(calc.evaluate('0 * 5')).toBe('0');
        });
    });
});
