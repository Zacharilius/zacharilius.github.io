import React, { useRef, useEffect, useState } from 'react';
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline'
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import usStates from './data/presidentialStateElectionResults/usStates.json';
import {
	Election,
	getElectionForYearIndex,
} from './data/presidentialStateElectionResults/parsedResults';
import { useInterval } from '../utils';
import { Feature, GeoJsonObject, GeoJsonProperties, Geometry } from 'geojson';

// Centers on the Lower 48 United States
const center: LatLngExpression = [37.8, -96];
const zoom = 4;

const MISSING_ELECTION_FALLBACK_COLOR = '#808080';

// Passing scope between the useEffect and the setInterval components is not working.
// This is the only hack I could figure out to get it working.
let _map: L.Map | null;

export default function Maps() {
	const mapRef = useRef(null);

	const [yearIndex, setYearIndex] = useState(0);
	const [activeElection, setActiveElection] = useState<Election>(getElectionForYearIndex(yearIndex))
	const [geoJsonLayer, setGeoJsonLayer] = useState<L.GeoJSON>();
	const [activeStateName, setActiveStateName] = useState<string>('');
	const [isPlaying, setIsPlaying] = useState<boolean>(true);

	const getColor = (stateName: string) => {
		const color = activeElection?.results?.[stateName]?.color;
		return color ?? MISSING_ELECTION_FALLBACK_COLOR;
	}

	function style(feature: Feature<Geometry, GeoJsonProperties> | undefined): L.PathOptions {
		return {
			fillColor: getColor(feature?.properties?.name),
			weight: 1,
			opacity: .6,
			color: 'white',
			dashArray: '1',
			fillOpacity: 0.7
		};
	}

	function updateGeoJsonLayer (map: L.Map) {
		if (geoJsonLayer) {
			geoJsonLayer.clearLayers();
		}
		const layer = L.geoJSON(usStates as GeoJsonObject, {
			style,
			onEachFeature,
		}).addTo(map);
		// TODO: On mobile the "clicked" state disappears when the year changes.
		setGeoJsonLayer(layer);
	}

	function onEachFeature(_feature: Feature<Geometry, GeoJsonProperties>, layer: L.GeoJSON) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
		});
	}

	function highlightFeature(e: L.LeafletMouseEvent) {
		const layer = e.target;
		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});
		setActiveStateName(layer.feature.properties.name);

		layer.bringToFront();
	}

	function resetHighlight(e: L.LeafletMouseEvent) {
		if (geoJsonLayer) {
			// TODO: This resets the style but... if time has changed it is reset wrong.
			geoJsonLayer.resetStyle(e.target);
		}
		setActiveStateName('');
	}

	useInterval(() => {
		if (isPlaying) {
			updateMapYear(1)
		}
	}, 2000);

	function updateMapYear (addOrSubtract: number) {
		const newYearIndex = yearIndex + addOrSubtract;
		setYearIndex(newYearIndex);
		setActiveElection(getElectionForYearIndex(newYearIndex));
		if (_map) {
			updateGeoJsonLayer(_map);
		}
	}

	useEffect(() => {
		// Initialize Leaflet map
		const element = mapRef.current as unknown as HTMLElement;
		const map = L.map(element).setView(center, zoom);
		_map = map;

		if (geoJsonLayer) {
			const layer = L.geoJSON(usStates as GeoJsonObject, {
				style,
				onEachFeature,
			}).addTo(map);
			setGeoJsonLayer(layer);
		}

		updateGeoJsonLayer(map);

		// Cleanup function to remove the map when the component unmounts
		return () => {
			if (map) {
				_map = null;
				map.remove();
			}
		};
	}, [center, zoom]);


	return (
		<div className="container mx-auto p-4 bg-gray-100">
			<h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Maps</h2>
			<h3 className="text-2xl font-bold text-center text-gray-800">{activeElection?.year} United States Presidential Elections Results by party.</h3>
			<h4 className="text-1xl font-bold text-center text-gray-800">Overall Winner: {activeElection?.overallWinner?.name} - {activeElection?.overallWinner?.politicalParty}</h4>
			<div className="relative">
				<div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
				{
					activeStateName
						? 
						<div className='absolute top-4 right-4 bg-gray-500 text-gray p-2'>
							<h3>Election Winner in {activeStateName}:</h3>
							<h4>{activeElection?.results?.[activeStateName]?.winner || 'N/A'}</h4>
						</div>
						:
						<div></div>
				}
				{
					<div className='absolute bottom-10 left-4 bg-gray-500 text-gray p-2'>
						<BackwardIcon aria-hidden="true" className="size-4 hover:bg-gray-700 active:bg-gray-800" onClick={() => updateMapYear(-1)} />
						{
							isPlaying
								?
								<PauseIcon aria-hidden="true" className="size-4 hover:bg-gray-700 active:bg-gray-800" onClick={() => setIsPlaying(false)} />
								:
								<PlayIcon aria-hidden="true" className="size-4 hover:bg-gray-700 active:bg-gray-800" onClick={() => setIsPlaying(true)} />
						}
						<ForwardIcon aria-hidden="true" className="size-4 hover:bg-gray-700 active:bg-gray-800" onClick={() => updateMapYear(1)} />
					</div>
				}
			</div>
			<p className="text-1xl font-bold text-right text-gray-800">Data was compiled from <a className="text-blue-600" href="https://en.wikipedia.org/wiki/List_of_United_States_presidential_election_results_by_state">Wikipedia</a></p>
		</div>
	)
}