'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { History, Delete, Trash2 } from 'lucide-react';

interface Calculation {
  expression: string;
  result: string;
  timestamp: number;
}

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<Calculation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [expression, setExpression] = useState('');

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clearDisplay = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
  }, []);

  const deleteLast = useCallback(() => {
    if (waitingForOperand) return;
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  }, [display, waitingForOperand]);

  const toggleSign = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  }, [display]);

  const inputPercent = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  }, [display]);

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return second !== 0 ? first / second : NaN;
      default: return second;
    }
  };

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setPreviousValue(result);
      setDisplay(String(result));
      setExpression(`${result} ${nextOperation}`);
    } else {
      setExpression(`${inputValue} ${nextOperation}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const handleEquals = useCallback(() => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(previousValue, inputValue, operation);
      
      const newCalc: Calculation = {
        expression: `${previousValue} ${operation} ${inputValue}`,
        result: String(result),
        timestamp: Date.now()
      };

      setHistory(prev => [newCalc, ...prev].slice(0, 10));
      setDisplay(String(result));
      setExpression('');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
      if (e.key === '.') inputDot();
      if (e.key === 'Enter' || e.key === '=') handleEquals();
      if (e.key === 'Escape' || e.key === 'c') clearDisplay();
      if (e.key === 'Backspace') deleteLast();
      if (e.key === '+') performOperation('+');
      if (e.key === '-') performOperation('-');
      if (e.key === '*') performOperation('×');
      if (e.key === '/') performOperation('÷');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDot, handleEquals, clearDisplay, deleteLast, performOperation]);

  return (
    <div className="h-full flex flex-col bg-background select-none">
      <div className="border-b p-3 flex items-center justify-between bg-muted/50">
        <h2 className="text-sm font-semibold tracking-tight uppercase opacity-70">Calculator</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => setShowHistory(!showHistory)}
          title="History"
        >
          <History className={cn("h-4 w-4 transition-colors", showHistory && "text-primary")} />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        {/* Display Area */}
        <div className="flex flex-col items-end justify-end p-4 bg-muted/30 rounded-xl border border-border/50 min-h-[100px] gap-1">
          <div className="text-xs font-medium text-muted-foreground h-4 overflow-hidden">
            {expression || (operation ? `${previousValue} ${operation}` : '')}
          </div>
          <div className="text-4xl font-bold tracking-tighter truncate w-full text-right">
            {display}
          </div>
        </div>
        
        <div className="relative flex-1">
          {/* Keypad */}
          <div className={cn("grid grid-cols-4 gap-2 h-full transition-opacity duration-200", showHistory ? "opacity-10 pointer-events-none" : "opacity-100")}>
            {/* Row 1 */}
            <Button variant="secondary" onClick={clearDisplay} className="h-full text-base font-bold text-destructive">AC</Button>
            <Button variant="secondary" onClick={deleteLast} className="h-full"><Delete className="h-5 w-5" /></Button>
            <Button variant="secondary" onClick={inputPercent} className="h-full">%</Button>
            <Button variant="default" onClick={() => performOperation('÷')} className="h-full bg-orange-500 hover:bg-orange-600 text-white text-xl">÷</Button>
            
            {/* Row 2 */}
            <Button variant="outline" onClick={() => inputDigit('7')} className="h-full text-lg">7</Button>
            <Button variant="outline" onClick={() => inputDigit('8')} className="h-full text-lg">8</Button>
            <Button variant="outline" onClick={() => inputDigit('9')} className="h-full text-lg">9</Button>
            <Button variant="default" onClick={() => performOperation('×')} className="h-full bg-orange-500 hover:bg-orange-600 text-white text-xl">×</Button>
            
            {/* Row 3 */}
            <Button variant="outline" onClick={() => inputDigit('4')} className="h-full text-lg">4</Button>
            <Button variant="outline" onClick={() => inputDigit('5')} className="h-full text-lg">5</Button>
            <Button variant="outline" onClick={() => inputDigit('6')} className="h-full text-lg">6</Button>
            <Button variant="default" onClick={() => performOperation('-')} className="h-full bg-orange-500 hover:bg-orange-600 text-white text-xl">-</Button>
            
            {/* Row 4 */}
            <Button variant="outline" onClick={() => inputDigit('1')} className="h-full text-lg">1</Button>
            <Button variant="outline" onClick={() => inputDigit('2')} className="h-full text-lg">2</Button>
            <Button variant="outline" onClick={() => inputDigit('3')} className="h-full text-lg">3</Button>
            <Button variant="default" onClick={() => performOperation('+')} className="h-full bg-orange-500 hover:bg-orange-600 text-white text-xl">+</Button>
            
            {/* Row 5 */}
            <Button variant="outline" onClick={toggleSign} className="h-full">+/-</Button>
            <Button variant="outline" onClick={() => inputDigit('0')} className="h-full text-lg">0</Button>
            <Button variant="outline" onClick={inputDot} className="h-full text-lg">.</Button>
            <Button variant="default" onClick={handleEquals} className="h-full bg-blue-600 hover:bg-blue-700 text-white text-xl">=</Button>
          </div>

          {/* History Overlay */}
          {showHistory && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex flex-col border p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-xs font-bold uppercase opacity-50">Recent History</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setHistory([])}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 p-1">
                {history.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
                    No history yet
                  </div>
                ) : (
                  history.map((calc, i) => (
                    <div 
                      key={i} 
                      className="p-2 rounded bg-muted/50 hover:bg-muted cursor-pointer transition-colors text-right group"
                      onClick={() => {
                        setDisplay(calc.result);
                        setShowHistory(false);
                      }}
                    >
                      <div className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">{calc.expression} =</div>
                      <div className="text-sm font-bold">{calc.result}</div>
                    </div>
                  ))
                )}
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                className="mt-2 w-full text-xs" 
                onClick={() => setShowHistory(false)}
              >
                Close History
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
