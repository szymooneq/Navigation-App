import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import { debounce } from './lib/helpers/debounce';

function DisplayPosition() {
	const map = useMap();
	const [position, setPosition] = useState(() => map.getCenter());
	let [searchParams, setSearchParams] = useSearchParams();

	const updateSearchParams = debounce(() => {
		const zoom = map.getZoom();
		const position = map.getCenter();
		setSearchParams({
			lat: position.lat.toFixed(4),
			lng: position.lng.toFixed(4),
			zoom: zoom.toString()
		});
	}, 500);

	const onMove = useCallback(() => {
		setPosition(map.getCenter());
		updateSearchParams();
	}, [map]);

	useEffect(() => {
		map.on('move', onMove);
		return () => {
			map.off('move', onMove);
		};
	}, [map, onMove]);

	return (
		<p className="info">
			Latitude: {position.lat.toFixed(4)}, Longitude: {position.lng.toFixed(4)}{' '}
		</p>
	);
}

export default DisplayPosition;
