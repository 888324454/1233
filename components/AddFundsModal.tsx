import React, { useState } from 'react';
import { WalletIcon } from './icons/WalletIcon';
import { ExclamationCircleIcon } from './icons/ExclamationCircleIcon';

interface AddFundsModalProps {
  onClose: () => void;
  onAddFunds: (amount: number) => void;
}

const FUND_AMOUNTS = [10, 25, 50, 100];

const AddFundsModal: React.FC<AddFundsModalProps> = ({ onClose, onAddFunds }) => {
  const [amount, setAmount] = useState<number>(FUND_AMOUNTS[1]);
  const [formState, setFormState] = useState({ cardNumber: '', expiry: '', cvc: '' });
  const [error, setError] = useState('');

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.cardNumber || !formState.expiry || !formState.cvc) {
      setError('Please fill in all payment details.');
      return;
    }
    setError('');
    onAddFunds(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-sm border border-purple-500/30">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-purple-300">Add Funds to Wallet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-light transition-all duration-200 ease-in-out hover:scale-125">&times;</button>
        </div>
        
        <form onSubmit={handleAddFunds}>
            <div className="p-6">
                <p className="text-gray-300 mb-4">Select an amount to add:</p>
                <div className="mb-6 grid grid-cols-4 gap-2">
                    {FUND_AMOUNTS.map(val => (
                        <button
                            type="button"
                            key={val}
                            onClick={() => setAmount(val)}
                            className={`py-2 px-4 rounded-lg font-bold transition-colors ${amount === val ? 'bg-purple-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                        >
                            ${val}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    <p className="text-gray-300">Enter payment details (mock):</p>
                    <input type="text" placeholder="Card Number (e.g., 4242...)" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" value={formState.cardNumber} onChange={(e) => setFormState({...formState, cardNumber: e.target.value})} />
                    <div className="flex space-x-2">
                        <input type="text" placeholder="MM/YY" className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" value={formState.expiry} onChange={(e) => setFormState({...formState, expiry: e.target.value})} />
                        <input type="text" placeholder="CVC" className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" value={formState.cvc} onChange={(e) => setFormState({...formState, cvc: e.target.value})} />
                    </div>
                </div>
                 {error && (
                    <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-md text-sm flex items-start space-x-2">
                        <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100"
              >
                <div className="flex items-center justify-center space-x-2">
                    <WalletIcon className="h-5 w-5" />
                    <span>Add ${amount.toFixed(2)}</span>
                </div>
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddFundsModal;
