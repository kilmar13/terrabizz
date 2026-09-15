import React, { useState } from 'react';
import { Copy, Percent, Calculator as CalcIcon, Delete } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState<number>(0);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNum = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDot = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleOp = (op: string) => {
    const currentNum = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(currentNum);
      setExpression(`${currentNum} ${op}`);
    } else if (operator && !waitingForNewValue) {
      const result = calculate(prevValue, currentNum, operator);
      setDisplay(String(result));
      setPrevValue(result);
      setExpression(`${result} ${op}`);
    } else {
      setExpression(`${prevValue} ${op}`);
    }
    
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const handleEqual = () => {
    if (operator && prevValue !== null) {
      const currentNum = parseFloat(display);
      const result = calculate(prevValue, currentNum, operator);
      
      const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
      
      setDisplay(String(formattedResult));
      setExpression(`${prevValue} ${operator} ${currentNum} =`);
      setPrevValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleAC = () => {
    setDisplay('0');
    setExpression('');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleC = () => {
    setDisplay('0');
  };

  const handleBackspace = () => {
    if (waitingForNewValue) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const handleMemory = (type: string) => {
    const currentNum = parseFloat(display);
    switch (type) {
      case 'MC': 
        setMemory(0); break;
      case 'M+': 
        setMemory(memory + currentNum); 
        setWaitingForNewValue(true); 
        break;
      case 'M-': 
        setMemory(memory - currentNum); 
        setWaitingForNewValue(true); 
        break;
      case 'MR': 
        setDisplay(String(memory)); 
        setWaitingForNewValue(true); 
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Button = ({ children, onClick, className, span = 1 }: { children: React.ReactNode, onClick: () => void, className: string, span?: number }) => (
    <button 
      onClick={onClick}
      className={`h-16 md:h-20 rounded-2xl text-xl font-bold transition-all shadow-sm flex items-center justify-center ${className}`}
      style={{ gridColumn: `span ${span}` }}
    >
      {children}
    </button>
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-[#10B981]/10 rounded-xl text-[#10B981]">
            <CalcIcon size={28} />
          </div>
          BUSINESS CALCULATOR
        </h1>
        <p className="text-slate-500 font-medium">Quick calculations for Naira values, discounts, and margins.</p>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-6 md:p-8 border-4 border-slate-800">
        <div className="bg-slate-800/50 rounded-3xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-2 right-4 text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
            {memory !== 0 && <span className="text-amber-500">M: {memory.toLocaleString()}</span>}
            <span>TERRABIZ TECH</span>
          </div>
          <div className="h-8 text-right text-slate-500 font-mono text-lg overflow-hidden whitespace-nowrap mb-1">
            {expression}
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-right text-white font-mono text-4xl md:text-6xl font-black overflow-hidden whitespace-nowrap flex-1">
              {parseFloat(display).toLocaleString()}
            </div>
            <button 
              onClick={copyToClipboard}
              className={`p-3 rounded-xl transition-all ${copied ? "bg-emerald-500 text-white" : "bg-white/10 text-slate-400 hover:bg-white/20"}`}
            >
              <Copy size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          <Button onClick={() => handleMemory('MC')} className="bg-slate-700 text-amber-500 text-sm">MC</Button>
          <Button onClick={() => handleMemory('M+')} className="bg-slate-700 text-amber-500 text-sm">M+</Button>
          <Button onClick={() => handleMemory('M-')} className="bg-slate-700 text-amber-500 text-sm">M-</Button>
          <Button onClick={() => handleMemory('MR')} className="bg-slate-700 text-amber-500 text-sm">MR</Button>
          
          <Button onClick={handleAC} className="bg-red-500/10 text-red-500">AC</Button>
          <Button onClick={handleC} className="bg-slate-700 text-slate-300">C</Button>
          <Button onClick={handleBackspace} className="bg-slate-700 text-slate-300"><Delete size={24} /></Button>
          <Button onClick={() => handleOp('/')} className="bg-[#10B981] text-white">÷</Button>

          <Button onClick={() => handleNum('7')} className="bg-slate-800 text-white hover:bg-slate-700">7</Button>
          <Button onClick={() => handleNum('8')} className="bg-slate-800 text-white hover:bg-slate-700">8</Button>
          <Button onClick={() => handleNum('9')} className="bg-slate-800 text-white hover:bg-slate-700">9</Button>
          <Button onClick={() => handleOp('*')} className="bg-[#10B981] text-white">×</Button>

          <Button onClick={() => handleNum('4')} className="bg-slate-800 text-white hover:bg-slate-700">4</Button>
          <Button onClick={() => handleNum('5')} className="bg-slate-800 text-white hover:bg-slate-700">5</Button>
          <Button onClick={() => handleNum('6')} className="bg-slate-800 text-white hover:bg-slate-700">6</Button>
          <Button onClick={() => handleOp('-')} className="bg-[#10B981] text-white">-</Button>

          <Button onClick={() => handleNum('1')} className="bg-slate-800 text-white hover:bg-slate-700">1</Button>
          <Button onClick={() => handleNum('2')} className="bg-slate-800 text-white hover:bg-slate-700">2</Button>
          <Button onClick={() => handleNum('3')} className="bg-slate-800 text-white hover:bg-slate-700">3</Button>
          <Button onClick={() => handleOp('+')} className="bg-[#10B981] text-white">+</Button>

          <Button onClick={() => handleNum('0')} className="bg-slate-800 text-white hover:bg-slate-700" span={2}>0</Button>
          <Button onClick={handleDot} className="bg-slate-800 text-white hover:bg-slate-700">.</Button>
          <Button onClick={handleEqual} className="bg-[#10B981] text-white">=</Button>
        </div>
      </div>
    </div>
  );
}
