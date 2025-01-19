import React, { useState } from 'react';
import Map from './components/Map';
import DrawButton from './components/DrawButton';
import MissionModal from './components/MissionModal';
import PolygonModal from './components/PolygonModal';
import InitialModal from './components/InitialModal'; // Import InitialModal
import { Coordinate } from 'ol/coordinate';
import { LineString, Polygon } from 'ol/geom';

const App: React.FC = () => {
  const [drawMode, setDrawMode] = useState<'LineString' | 'Polygon' | null>(null);
  const [lineStringCoordinates, setLineStringCoordinates] = useState<Coordinate[]>([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState<Coordinate[]>([]);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showPolygonModal, setShowPolygonModal] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [insertPosition, setInsertPosition] = useState<'before' | 'after' | null>(null);
  const [showInitialModal, setShowInitialModal] = useState(true); // Add new state for initial modal

  const handleDrawComplete = (geometry: LineString | Polygon) => {
    if (geometry instanceof LineString) {
      setLineStringCoordinates(geometry.getCoordinates());
      setShowMissionModal(true);
    } else if (geometry instanceof Polygon) {
      setPolygonCoordinates(geometry.getCoordinates()[0]);
      setShowPolygonModal(true);
    }
    setDrawMode(null);
  };

  const handleDrawButtonClick = () => {
    setShowInitialModal(true); // Update handleDrawButtonClick
  };

  const handleInsertPolygon = (index: number, position: 'before' | 'after') => {
    setInsertIndex(index);
    setInsertPosition(position);
    setDrawMode('Polygon');
    setShowMissionModal(false);
  };

  const handleImportPolygon = () => {
    if (insertIndex !== null && insertPosition !== null) {
      const newLineStringCoordinates = [...lineStringCoordinates];
      const insertAt = insertPosition === 'after' ? insertIndex + 1 : insertIndex;
      newLineStringCoordinates.splice(insertAt, 0, ...polygonCoordinates);
      setLineStringCoordinates(newLineStringCoordinates);
      setShowPolygonModal(false);
      setShowMissionModal(true);
      setInsertIndex(null);
      setInsertPosition(null);
    }
  };

  const handleGenerateData = () => { // Add new handler for Generate Data
    setShowInitialModal(false);
    setDrawMode('LineString');
    setShowMissionModal(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 relative">
        <Map drawMode={drawMode} onDrawComplete={handleDrawComplete} />
        <DrawButton onClick={handleDrawButtonClick} />
      </div>
      {showInitialModal && ( // Add InitialModal to the JSX
        <InitialModal
          onClose={() => setShowInitialModal(false)}
          onGenerateData={handleGenerateData}
        />
      )}
      {showMissionModal && (
        <MissionModal
          coordinates={lineStringCoordinates}
          onClose={() => setShowMissionModal(false)}
          onInsertPolygon={handleInsertPolygon}
        />
      )}
      {showPolygonModal && (
        <PolygonModal
          coordinates={polygonCoordinates}
          onClose={() => setShowPolygonModal(false)}
          onImport={handleImportPolygon}
        />
      )}
    </div>
  );
};

export default App;

