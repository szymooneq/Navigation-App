import { useContext, useState } from 'react';
import { RouteContext } from '../../lib/context/RouteProvider';
import { recalculatePrice } from '../../lib/helpers/recalculatePrice';
import PrintWrapper from '../PrintWrapper';

function MapDetails(): JSX.Element {
	const { state } = useContext(RouteContext);
	const [rate, setRate] = useState('');

	const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRate(e.target.value);
	};

	console.log(isNaN(+rate));

	return (
		<PrintWrapper className="p-3 flex flex-row flex-wrap gap-3 h-max font-semibold tracking-tight text-gray-100 md:flex-wrap md:flex-row relative">
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
				</div>
			</div>

			<div className="p-3 w-full">
				<h1 className="text-3xl font-bold text-[#14b8a6]">Price:</h1>
				<div className="mb-3 p-3 bg-zinc-900 rounded-lg">
					<div className="mt-1 flex items-center gap-2">
						<label htmlFor="multiplier">Rate ($ per/km):</label>
						<input
							className="block w-full p-1 rounded-md bg-black text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6] lg:w-40"
							type="text"
							name="multiplier"
							id="multiplier"
							step={0.1}
							value={rate}
							onChange={handleRateChange}
							placeholder="Enter rate"
						/>
					</div>
					<p>
						Days (1000$ per/day):{' '}
						<span className="font-normal text-zinc-400">
							{Math.round(state.route.details.distance / 800 / 1000)}
						</span>
					</p>
					<p className="mt-2">
						10%:{' '}
						<span className="font-normal text-zinc-400">
							{(
								(recalculatePrice(rate, state.route.details.distance / 1000) *
									0.1) /
								1.1
							).toFixed(2)}{' '}
							$
						</span>
					</p>
					<p className="mt-2">
						Total:{' '}
						<span className="font-bold text-[#14b8a6]">
							{recalculatePrice(rate, state.route.details.distance / 1000)} $
						</span>
					</p>
				</div>
			</div>
		</PrintWrapper>
	);
}

export default MapDetails;
