import { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Context } from '../../lib/context/AppContext';
import '../../styles/map.css';
import DisplayPosition from './DisplayPosition';
import Location from './Location';
import Routing from './Routing';

function MapControl() {
	const { state } = useContext(Context);

	return (
		<MapContainer
			center={[state.position.lat, state.position.lng]}
			zoom={state.position.zoom}
			zoomControl={false}
			scrollWheelZoom={true}>
			<TileLayer
				attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
				minZoom={0}
				maxZoom={22}
				subdomains="abcd"
				accessToken="PyTJUlEU1OPJwCJlW1k0NC8JIt2CALpyuj7uc066O7XbdZCjWEL3WYJIk6dnXtps"
			/>
			<DisplayPosition />
			<Routing />
			<Location />
		</MapContainer>
	);
}

export default MapControl;
