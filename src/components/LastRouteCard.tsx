import { IRoute } from '../lib/interfaces/context';

interface props {
	route: IRoute;
}

function LastRouteCard({ route }: props) {
	return (
		<div className="mb-3 p-3 bg-zinc-900 rounded-lg border border-zinc-700 hover:border-[#14b8a6] hover:cursor-pointer">
			<p>
				From:{' '}
				<span className="font-normal text-zinc-400">
					{route.waypoints.startingPoint.name}
				</span>
			</p>
			<p className="mt-1">
				To:{' '}
				<span className="font-normal text-zinc-400">
					{route.waypoints.endingPoint.name}
				</span>
			</p>
			<div className="flex gap-3">
				<p className="mt-1">
					Distance:{' '}
					<span className="font-normal text-zinc-400">
						{(route.details.distance / 1000).toFixed(1)} km
					</span>
				</p>
				<p className="mt-1">
					Duration:{' '}
					<span className="font-normal text-zinc-400">
						{Math.ceil(route.details.duration / 60)} min
					</span>
				</p>
			</div>
		</div>
	);
}

export default LastRouteCard;
