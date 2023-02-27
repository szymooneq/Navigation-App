import 'leaflet-routing-machine';
import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

function DisplayPosition() {
	const map = useMap();
	const [position, setPosition] = useState(() => map.getCenter());

	const onMove = useCallback(() => {
		setPosition(map.getCenter());
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
