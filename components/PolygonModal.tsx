import React from 'react';
import { Coordinate } from 'ol/coordinate';
import { getDistance } from 'ol/sphere';

interface PolygonModalProps {
  coordinates: Coordinate[];
  onClose: () => void;
  onImport: () => void;
}

const PolygonModal: React.FC<PolygonModalProps> = ({ coordinates, onClose, onImport }) => {
  const calculateDistance = (coord1: Coordinate, coord2: Coordinate) => {
    return getDistance(coord1, coord2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Polygon Coordinates</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Point</th>
              <th>Coordinates</th>
              <th>Distance (m)</th>
            </tr>
          </thead>
          <tbody>
            {coordinates.map((coord, index) => (
              <tr key={index}>
                <td>P{index + 1}</td>
                <td>{`${coord[0].toFixed(8)}, ${coord[1].toFixed(8)}`}</td>
                <td>
                  {index > 0
                    ? calculateDistance(coordinates[index - 1], coord).toFixed(2)
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={onImport}
          >
            Import Points
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolygonModal;

