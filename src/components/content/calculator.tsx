'use client';

import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Display */}
      <div className="p-4 bg-black/90 text-right">
        <div className="text-3xl font-light text-white overflow-hidden overflow-ellipsis">
          {display}
        </div>
      </div>
      
      {/* Keypad */}
      <div className="flex-1 grid grid-cols-4 gap-0.5 bg-gray-300 dark:bg-gray-700 p-0.5">
        <button 
          onClick={clearAll}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white font-medium p-4"
        >
          AC
        </button>
        <button 
          onClick={toggleSign}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white font-medium p-4"
        >
          +/-
        </button>
        <button 
          onClick={inputPercent}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white font-medium p-4"
        >
          %
        </button>
        <button 
          onClick={() => inputOperation('÷')}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl font-light p-4"
        >
          ÷
        </button>
        
        <button 
          onClick={() => inputNumber('7')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          7
        </button>
        <button 
          onClick={() => inputNumber('8')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          8
        </button>
        <button 
          onClick={() => inputNumber('9')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          9
        </button>
        <button 
          onClick={() => inputOperation('×')}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl font-light p-4"
        >
          ×
        </button>
        
        <button 
          onClick={() => inputNumber('4')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          4
        </button>
        <button 
          onClick={() => inputNumber('5')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          5
        </button>
        <button 
          onClick={() => inputNumber('6')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          6
        </button>
        <button 
          onClick={() => inputOperation('-')}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl font-light p-4"
        >
          -
        </button>
        
        <button 
          onClick={() => inputNumber('1')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          1
        </button>
        <button 
          onClick={() => inputNumber('2')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          2
        </button>
        <button 
          onClick={() => inputNumber('3')}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          3
        </button>
        <button 
          onClick={() => inputOperation('+')}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl font-light p-4"
        >
          +
        </button>
        
        <button 
          onClick={() => inputNumber('0')}
          className="col-span-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4 text-left"
        >
          0
        </button>
        <button 
          onClick={inputDecimal}
          className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-xl p-4"
        >
          .
        </button>
        <button 
          onClick={performCalculation}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl font-light p-4"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;