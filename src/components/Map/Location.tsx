import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

const createRoutineMachineLayer = () => {
	const instance = L.control.locate({
		flyTo: true,
		strings: {
			title: 'Show your location'
			// popup: 'Testowa wiadmość na lokalizacji'
		},
		locateOptions: {
			enableHighAccuracy: true
		}
	});

	return instance;
};

const Location = createControlComponent(createRoutineMachineLayer);

export default Location;
