import React from 'react';

interface DrawButtonProps {
  onClick: () => void;
}

const DrawButton: React.FC<DrawButtonProps> = ({ onClick }) => {
  return (
    <button
      className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      Draw
    </button>
  );
};

export default DrawButton;

