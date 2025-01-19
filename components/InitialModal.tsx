import React from 'react';
import { X } from 'lucide-react';

interface InitialModalProps {
  onClose: () => void;
  onGenerateData: () => void;
}

const InitialModal: React.FC<InitialModalProps> = ({ onClose, onGenerateData }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Mission Creation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <h3 className="font-medium">Waypoint Navigation</h3>
          <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-600">
            Click on the map to mark points of the route and then press +1 complete the route.
          </div>
          <div className="flex justify-end">
            <button
              onClick={onGenerateData}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Generate Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialModal;

