'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPreviousValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      performOperation(operation);
      setOperation(null);
      setPreviousValue(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">Calculator</h2>
      </div>
      
      <div className="flex-1 flex flex-col bg-muted p-4">
        {/* Display */}
        <div className="bg-black text-right p-4 rounded-t-lg mb-1">
          <div className="text-3xl font-mono text-white overflow-hidden">
            {display.length > 12 ? display.slice(0, 12) + '...' : display}
          </div>
        </div>
        
        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2 flex-1">
          <Button variant="outline" onClick={clearDisplay} className="h-full text-lg font-bold">
            AC
          </Button>
          <Button variant="outline" onClick={toggleSign} className="h-full text-lg font-bold">
            +/-
          </Button>
          <Button variant="outline" onClick={inputPercent} className="h-full text-lg font-bold">
            %
          </Button>
          <Button 
            variant="default" 
            onClick={() => performOperation('÷')} 
            className="h-full text-lg font-bold bg-orange-500 hover:bg-orange-600"
          >
            ÷
          </Button>
          
          <Button variant="outline" onClick={() => inputDigit('7')} className="h-full text-lg font-bold">
            7
          </Button>
          <Button variant="outline" onClick={() => inputDigit('8')} className="h-full text-lg font-bold">
            8
          </Button>
          <Button variant="outline" onClick={() => inputDigit('9')} className="h-full text-lg font-bold">
            9
          </Button>
          <Button 
            variant="default" 
            onClick={() => performOperation('×')} 
            className="h-full text-lg font-bold bg-orange-500 hover:bg-orange-600"
          >
            ×
          </Button>
          
          <Button variant="outline" onClick={() => inputDigit('4')} className="h-full text-lg font-bold">
            4
          </Button>
          <Button variant="outline" onClick={() => inputDigit('5')} className="h-full text-lg font-bold">
            5
          </Button>
          <Button variant="outline" onClick={() => inputDigit('6')} className="h-full text-lg font-bold">
            6
          </Button>
          <Button 
            variant="default" 
            onClick={() => performOperation('-')} 
            className="h-full text-lg font-bold bg-orange-500 hover:bg-orange-600"
          >
            -
          </Button>
          
          <Button variant="outline" onClick={() => inputDigit('1')} className="h-full text-lg font-bold">
            1
          </Button>
          <Button variant="outline" onClick={() => inputDigit('2')} className="h-full text-lg font-bold">
            2
          </Button>
          <Button variant="outline" onClick={() => inputDigit('3')} className="h-full text-lg font-bold">
            3
          </Button>
          <Button 
            variant="default" 
            onClick={() => performOperation('+')} 
            className="h-full text-lg font-bold bg-orange-500 hover:bg-orange-600"
          >
            +
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => inputDigit('0')} 
            className="h-full text-lg font-bold col-span-2"
          >
            0
          </Button>
          <Button variant="outline" onClick={inputDot} className="h-full text-lg font-bold">
            .
          </Button>
          <Button 
            variant="default" 
            onClick={handleEquals} 
            className="h-full text-lg font-bold bg-orange-500 hover:bg-orange-600"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;