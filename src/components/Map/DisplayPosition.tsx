import 'leaflet-routing-machine';
import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
// import { useSearchParams } from 'react-router-dom';
import { debounce } from '../../lib/helpers/debounce';

interface props {
	searchParams: URLSearchParams;
	updateSearchParams: (searchParams: URLSearchParams) => void;
}

function DisplayPosition({ searchParams, updateSearchParams }: props) {
	const map = useMap();
	const [position, setPosition] = useState(() => map.getCenter());
	// let [searchParams, setSearchParams] = useSearchParams();

	const handleUpdatePosition = debounce(() => {
		const zoom = map.getZoom();
		const position = map.getCenter();

		searchParams.set('lat', position.lat.toFixed(4));
		searchParams.set('lng', position.lng.toFixed(4));
		searchParams.set('zoom', zoom.toString());

		updateSearchParams(searchParams);
	}, 500);

	const onMove = useCallback(() => {
		setPosition(map.getCenter());
		handleUpdatePosition();
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
