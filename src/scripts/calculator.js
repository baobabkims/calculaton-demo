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
            // Preprocess expression: convert symbols
            const processedExpr = this.preprocessExpression(expression);

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
