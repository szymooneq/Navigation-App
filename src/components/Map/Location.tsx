import L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function Location(): null {
	const map = useMap();

	const location = L.control.locate({
		flyTo: true,
		strings: {
			title: 'Show your location'
			// popup: 'Testowa wiadmość na lokalizacji'
		},
		locateOptions: {
			enableHighAccuracy: true
		}
	});

	useEffect(() => {
		if (!map) return;

		location.addTo(map);
		return () => {
			map.removeControl(location);
		};
	}, []);

	return null;
}

export default Location;
