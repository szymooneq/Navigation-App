import MapControl from '../components/Map/MapControl';
import MapDetails from '../components/Map/MapDetails';
import '../styles/home.css';

function Map() {
	return (
		<div className="map-page md:flex-1">
			<MapControl />
			<MapDetails />
		</div>
	);
}

export default Map;
