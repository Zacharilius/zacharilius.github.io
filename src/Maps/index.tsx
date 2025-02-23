import React, { useRef, useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import usStates from './data/presidentialStateElectionResults/usStates.json';
import { getPresendentialElectionResultsForYearIndex, getPresendentialElectionYearInfosForYearIndex } from './data/presidentialStateElectionResults/parsedResults';

// Centers on the Lower 48 United States
const center: LatLngExpression = [37.8, -96];
const zoom = 4;

export default function Maps() {
  const mapRef = useRef(null);

  const [title, setTitle] = useState('');
  const [yearIndex, setYearIndex] = useState(0);
  // const [geoJsonLayer, setGeoJsonLayer] = useState(null);

  const getColor = (stateName: string, index: number) => {
    const stateResults = getPresendentialElectionResultsForYearIndex(index);
    const result = stateResults[stateName];
    return result?.color ?? '#808080';
  }

  function style(feature: any): any {
    return {
      fillColor: getColor(feature.properties.name, yearIndex),
      weight: 1,
      opacity: .6,
      color: 'white',
      dashArray: '1',
      fillOpacity: 0.7
    };
  }

  useEffect(() => {
    // Initialize Leaflet map
    const element = mapRef.current as unknown as HTMLElement;
    const map = L.map(element).setView(center, zoom);

    // if (geoJsonLayer) {
      const layer = L.geoJSON(usStates, {style}).addTo(map);
      // setGeoJsonLayer(layer);
      setTitle(new String(yearIndex));
    // }

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [center, zoom]); // Re-run effect when center or zoom changes

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Maps</h2>
      <p className="text-1xl font-bold mb-8 text-center text-gray-600">{getPresendentialElectionYearInfosForYearIndex(yearIndex).value} Election</p>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
    </div>
  )
}