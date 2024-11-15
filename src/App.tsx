import React, { useState } from 'react';
import { Equal, Delete, Plus, Minus, X, Divide, RotateCcw } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      const result = eval(fullEquation.replace('×', '*').replace('÷', '/'));
      setDisplay(String(result));
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl w-full max-w-sm border border-white/20">
        <div className="mb-4">
          <div className="text-gray-300 text-right h-6 text-sm">{equation}</div>
          <div className="text-white text-right text-4xl font-light tracking-wider h-12 overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <button onClick={clear} className="btn col-span-2 bg-red-500/20 hover:bg-red-500/30 text-red-100">
            <RotateCcw size={18} /> Clear
          </button>
          <button onClick={deleteLastDigit} className="btn col-span-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-100">
            <Delete size={18} /> Delete
          </button>
          
          {['7', '8', '9'].map(num => (
            <button key={num} onClick={() => handleNumber(num)} className="btn bg-white/10 hover:bg-white/20">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('÷')} className="btn bg-violet-500/20 hover:bg-violet-500/30 text-violet-100">
            <Divide size={18} />
          </button>
          
          {['4', '5', '6'].map(num => (
            <button key={num} onClick={() => handleNumber(num)} className="btn bg-white/10 hover:bg-white/20">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('×')} className="btn bg-violet-500/20 hover:bg-violet-500/30 text-violet-100">
            <X size={18} />
          </button>
          
          {['1', '2', '3'].map(num => (
            <button key={num} onClick={() => handleNumber(num)} className="btn bg-white/10 hover:bg-white/20">
              {num}
            </button>
          ))}
          <button onClick={() => handleOperator('-')} className="btn bg-violet-500/20 hover:bg-violet-500/30 text-violet-100">
            <Minus size={18} />
          </button>
          
          <button onClick={() => handleNumber('0')} className="btn bg-white/10 hover:bg-white/20">
            0
          </button>
          <button onClick={() => handleNumber('.')} className="btn bg-white/10 hover:bg-white/20">
            .
          </button>
          <button onClick={calculate} className="btn bg-green-500/20 hover:bg-green-500/30 text-green-100">
            <Equal size={18} />
          </button>
          <button onClick={() => handleOperator('+')} className="btn bg-violet-500/20 hover:bg-violet-500/30 text-violet-100">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;