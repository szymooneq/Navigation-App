import 'leaflet-routing-machine';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { Context } from '../../lib/context/AppContext';
import { debounce } from '../../lib/helpers/debounce';

function DisplayPosition() {
	const { handleSetPosition } = useContext(Context);
	const map = useMap();
	const [position, setPosition] = useState(() => map.getCenter());

	const handleUpdatePosition = debounce(() => {
		const position = map.getCenter();
		const zoom = map.getZoom();

		const currentPosition = {
			lat: +position.lat.toFixed(4),
			lng: +position.lng.toFixed(4),
			zoom: +zoom.toString()
		};

		handleSetPosition(currentPosition);
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
