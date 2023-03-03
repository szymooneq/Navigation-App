import { useContext } from 'react';
import { RouteContext } from '../../lib/context/RouteProvider';

function MapDetails(): JSX.Element {
	const { state } = useContext(RouteContext);

	return (
		<div className="p-3 flex flex-row flex-wrap gap-3 h-max font-semibold tracking-tight text-gray-100 md:flex-wrap md:flex-row">
			<div className="p-3 w-full md:flex-1">
				<h1 className="text-3xl font-bold text-[#14b8a6]">Destination:</h1>
				<div className="mb-3 p-3 bg-zinc-900 rounded-lg">
					<p>
						Start:{' '}
						<span className="font-normal text-zinc-400">
							{state.route.waypoints.startingPoint.name}
						</span>
					</p>
					<p className="mt-2">
						End:{' '}
						<span className="font-normal text-zinc-400">
							{state.route.waypoints.endingPoint.name}
						</span>
					</p>
				</div>
			</div>

			<div className="p-3 w-full md:flex-1">
				<h1 className="text-3xl font-bold text-[#14b8a6]">Details:</h1>
				<div className="mb-3 p-3 bg-zinc-900 rounded-lg">
					<p>
						Distance:{' '}
						<span className="font-normal text-zinc-400">
							{(state.route.details.distance / 1000).toFixed(1)} km
						</span>
					</p>
					<p className="mt-2">
						Duration:{' '}
						<span className="font-normal text-zinc-400">
							{Math.ceil(state.route.details.duration / 60)} min
						</span>
					</p>
					<div className="mt-1 flex items-center gap-2">
						<label htmlFor="multiplier">Multiplier:</label>
						<input
							className="block w-full p-1 rounded-md bg-black text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6] lg:w-40"
							type="number"
							name="multiplier"
							id="multiplier"
							step={1}
							placeholder="Enter multiplier"
						/>
					</div>
				</div>
			</div>

			<div className="p-3 w-full">
				<h1 className="text-3xl font-bold text-[#14b8a6] whitespace-nowrap">
					Total price: <span className="text-white">100$</span>
				</h1>
			</div>
		</div>
	);
}

export default MapDetails;
