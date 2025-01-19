import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Draw, Modify } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { LineString, Polygon } from 'ol/geom';

interface MapProps {
  drawMode: 'LineString' | 'Polygon' | null;
  onDrawComplete: (geometry: LineString | Polygon) => void;
}

const MapComponent: React.FC<MapProps> = ({ drawMode, onDrawComplete }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const drawInteractionRef = useRef<Draw | null>(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      mapInstanceRef.current = map;

      const modify = new Modify({ source: vectorSource });
      map.addInteraction(modify);
    }
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map) {
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
      }

      if (drawMode) {
        const draw = new Draw({
          source: map.getLayers().getArray()[1].getSource() as VectorSource,
          type: drawMode,
        });

        draw.on('drawend', (event) => {
          onDrawComplete(event.feature.getGeometry() as LineString | Polygon);
        });

        map.addInteraction(draw);
        drawInteractionRef.current = draw;

        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            draw.finishDrawing();
          }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }
  }, [drawMode, onDrawComplete]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapComponent;

