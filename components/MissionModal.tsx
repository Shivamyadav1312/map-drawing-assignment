import React from 'react';
import { Coordinate } from 'ol/coordinate';
import { getDistance } from 'ol/sphere';

interface MissionModalProps {
  coordinates: Coordinate[];
  onClose: () => void;
  onInsertPolygon: (index: number, position: 'before' | 'after') => void;
}

const MissionModal: React.FC<MissionModalProps> = ({ coordinates, onClose, onInsertPolygon }) => {
  const calculateDistance = (coord1: Coordinate, coord2: Coordinate) => {
    return getDistance(coord1, coord2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Mission Planner</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>WP</th>
              <th>Coordinates</th>
              <th>Distance (m)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coordinates.map((coord, index) => (
              <tr key={index}>
                <td>WP({index.toString().padStart(2, '0')})</td>
                <td>{`${coord[0].toFixed(8)}, ${coord[1].toFixed(8)}`}</td>
                <td>
                  {index > 0
                    ? calculateDistance(coordinates[index - 1], coord).toFixed(2)
                    : '-'}
                </td>
                <td>
                  <div className="relative">
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => {
                        const dropdown = document.getElementById(`dropdown-${index}`);
                        if (dropdown) {
                          dropdown.classList.toggle('hidden');
                        }
                      }}
                    >
                      •••
                    </button>
                    <div id={`dropdown-${index}`} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => onInsertPolygon(index, 'before')}
                      >
                        Insert Polygon Before
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => onInsertPolygon(index, 'after')}
                      >
                        Insert Polygon After
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MissionModal;

