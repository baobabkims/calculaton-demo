/**
 * Main Application Entry Point
 * 
 * Initializes the calculator UI and connects it with the Calculator engine
 */

import { Calculator } from './calculator.js';

class CalculatorApp {
    constructor() {
        this.calculator = new Calculator();
        this.currentExpression = '';
        this.angleMode = 'DEG'; // DEG or RAD
        this.secondMode = false; // 2nd mode toggle

        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Display elements
        this.expressionDisplay = document.getElementById('expression-display');
        this.resultDisplay = document.getElementById('result-display');

        // Mode toggles
        this.degRadToggle = document.getElementById('deg-rad-toggle');

        // Keypad
        this.keypad = document.querySelector('.keypad');
    }

    attachEventListeners() {
        // Keypad event delegation
        this.keypad.addEventListener('click', (e) => {
            const button = e.target.closest('.btn');
            if (!button) return;

            this.handleButtonClick(button);
        });

        // DEG/RAD toggle
        this.degRadToggle.addEventListener('click', () => {
            this.toggleAngleMode();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });
    }

    handleButtonClick(button) {
        const number = button.dataset.number;
        const operator = button.dataset.operator;
        const action = button.dataset.action;
        const func = button.dataset.function;

        if (number !== undefined) {
            this.appendToExpression(number);
        } else if (operator) {
            this.appendOperator(operator);
        } else if (action) {
            this.handleAction(action);
        } else if (func) {
            this.handleFunction(func);
        }
    }

    appendToExpression(value) {
        this.currentExpression += value;
        this.updateDisplay();
    }

    appendOperator(operator) {
        // Convert operator symbols
        const operatorMap = {
            '*': ' × ',
            '/': ' ÷ ',
            '+': ' + ',
            '-': ' - '
        };

        this.currentExpression += operatorMap[operator] || ` ${operator} `;
        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'equals':
                this.calculate();
                break;
            case '(':
            case ')':
                this.currentExpression += action;
                this.updateDisplay();
                break;
            case '2nd':
                this.toggleSecondMode();
                break;
        }
    }

    handleFunction(func) {
        switch (func) {
            case 'sin':
            case 'cos':
            case 'tan':
                this.currentExpression += `${func}(`;
                break;
            case 'sqrt':
                this.currentExpression += 'sqrt(';
                break;
            case 'square':
                this.currentExpression += '^2';
                break;
            case 'cube':
                this.currentExpression += '^3';
                break;
            case 'power':
                this.currentExpression += '^';
                break;
            case 'ln':
                this.currentExpression += 'ln(';
                break;
            case 'log':
                this.currentExpression += 'log(';
                break;
            case 'pi':
                this.currentExpression += 'pi';
                break;
        }
        this.updateDisplay();
    }

    clear() {
        this.currentExpression = '';
        this.updateDisplay();
        this.resultDisplay.textContent = '0';
    }

    backspace() {
        this.currentExpression = this.currentExpression.slice(0, -1);
        this.updateDisplay();
    }

    calculate() {
        if (!this.currentExpression.trim()) return;

        try {
            const result = this.calculator.evaluate(this.currentExpression);
            this.resultDisplay.textContent = result;

            // Add animation
            this.resultDisplay.classList.add('animate-pulse-once');
            setTimeout(() => {
                this.resultDisplay.classList.remove('animate-pulse-once');
            }, 300);

            // If successful calculation, update expression
            if (result !== 'Error') {
                this.currentExpression = result;
            }
        } catch (error) {
            this.resultDisplay.textContent = 'Error';
        }
    }

    updateDisplay() {
        this.expressionDisplay.textContent = this.currentExpression || '';
    }

    toggleAngleMode() {
        this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
        this.degRadToggle.textContent = this.angleMode;
    }

    toggleSecondMode() {
        this.secondMode = !this.secondMode;
        // TODO: Update button labels for 2nd mode
    }

    handleKeyboardInput(e) {
        const key = e.key;

        // Numbers
        if (/^[0-9.]$/.test(key)) {
            this.appendToExpression(key);
            e.preventDefault();
        }

        // Operators
        else if (['+', '-', '*', '/'].includes(key)) {
            this.appendOperator(key);
            e.preventDefault();
        }

        // Enter = Calculate
        else if (key === 'Enter') {
            this.calculate();
            e.preventDefault();
        }

        // Escape = Clear
        else if (key === 'Escape') {
            this.clear();
            e.preventDefault();
        }

        // Backspace
        else if (key === 'Backspace') {
            this.backspace();
            e.preventDefault();
        }

        // Parentheses
        else if (key === '(' || key === ')') {
            this.currentExpression += key;
            this.updateDisplay();
            e.preventDefault();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorApp();
});
