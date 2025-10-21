import React, { useState } from 'react';
import { GiftIcon } from './icons/GiftIcon';

interface TippingModalProps {
  creatorUsername: string;
  walletBalance: number;
  onClose: () => void;
  onConfirmTip: (amount: number, creator: string) => void;
}

const TIP_AMOUNTS = [1, 5, 10, 20];

const TippingModal: React.FC<TippingModalProps> = ({ creatorUsername, walletBalance, onClose, onConfirmTip }) => {
  const [tipAmount, setTipAmount] = useState<number>(TIP_AMOUNTS[1]);

  const handleConfirm = () => {
    onConfirmTip(tipAmount, creatorUsername);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-sm border border-yellow-500/30">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-yellow-300">Send a Tip to {creatorUsername}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-light transition-all duration-200 ease-in-out hover:scale-125">&times;</button>
        </div>
        
        <div className="p-6 text-center">
            <GiftIcon className="h-16 w-16 text-yellow-400 mx-auto" />
            <p className="text-gray-300 mt-4">
                Show your appreciation for {creatorUsername}'s content!
            </p>
            <p className="text-sm text-gray-500 mt-1">
                Your Balance: ${walletBalance.toFixed(2)}
            </p>

            <div className="mt-6 grid grid-cols-4 gap-2">
                {TIP_AMOUNTS.map(amount => (
                    <button 
                        key={amount}
                        onClick={() => setTipAmount(amount)}
                        className={`py-2 px-4 rounded-lg font-bold transition-colors ${tipAmount === amount ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                    >
                        ${amount}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleConfirm}
            disabled={walletBalance < tipAmount}
            className="w-full bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {walletBalance < tipAmount ? 'Insufficient Funds' : `Send $${tipAmount.toFixed(2)} Tip`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TippingModal;
