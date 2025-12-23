/**
 * Calculator Engine
 * 
 * Core calculation engine following SOLID principles:
 * - SRP: Only responsible for evaluating mathematical expressions
 * - DIP: Depends on abstraction (mathEngine interface)
 */

import { create, all } from 'mathjs';

export class Calculator {
    /**
     * Creates a Calculator instance
     * @param {Object} mathEngine - Math engine (default: math.js)
     */
    constructor(mathEngine = null) {
        // Dependency Injection: Allow custom math engine for testing
        this.mathEngine = mathEngine || create(all);
    }

    /**
   * Evaluates a mathematical expression
   * @param {string} expression - Mathematical expression to evaluate
   * @returns {string} Result as string or "Error"
   */
    evaluate(expression) {
        try {
            // Handle null/undefined
            if (expression == null || expression === undefined) {
                return 'Error';
            }

            // Convert to string if needed
            const expr = String(expression).trim();

            // Check for empty expression
            if (expr === '') {
                return 'Error';
            }

            // Validate parentheses
            if (!this.validateParentheses(expr)) {
                return 'Error';
            }

            // Preprocess expression: convert symbols
            const processedExpr = this.preprocessExpression(expr);

            // Evaluate using math engine
            const result = this.mathEngine.evaluate(processedExpr);

            // Check for invalid results
            if (!isFinite(result)) {
                return 'Error';
            }

            if (isNaN(result)) {
                return 'Error';
            }

            // Format and return result
            return this.formatResult(result);
        } catch (error) {
            return 'Error';
        }
    }

    /**
     * Validates that parentheses are balanced
     * @param {string} expr - Expression to validate
     * @returns {boolean} True if parentheses are balanced
     * @private
     */
    validateParentheses(expr) {
        const open = (expr.match(/\(/g) || []).length;
        const close = (expr.match(/\)/g) || []).length;

        if (open !== close) {
            return false;
        }

        // Check for empty parentheses
        if (expr.includes('()')) {
            return false;
        }

        // Check for proper nesting
        let depth = 0;
        for (const char of expr) {
            if (char === '(') depth++;
            if (char === ')') depth--;
            if (depth < 0) return false;
        }

        return depth === 0;
    }

    /**
     * Preprocesses expression to normalize symbols
     * @param {string} expr - Raw expression
     * @returns {string} Processed expression
     * @private
     */
    preprocessExpression(expr) {
        return expr
            .replace(/×/g, '*')  // Convert × to *
            .replace(/÷/g, '/')  // Convert ÷ to /
            .trim();
    }

    /**
     * Formats the calculation result
     * @param {number} result - Calculation result
     * @returns {string} Formatted result
     * @private
     */
    formatResult(result) {
        // Round to avoid floating point precision issues
        const rounded = Math.round(result * 1e10) / 1e10;

        // Convert to string and remove unnecessary decimals
        const str = rounded.toString();

        return str;
    }
}
