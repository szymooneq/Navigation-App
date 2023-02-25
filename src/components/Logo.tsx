import { MapPinIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function Logo() {
	return (
		<Link
			to="/"
			className="my-4 mb-8 mx-auto flex items-center justify-center gap-1 w-max text-[#14b8a6]">
			<MapPinIcon width={35} height={35} />
			<h1 className="text-4xl font-bold">Navigation</h1>
		</Link>
	);
}

export default Logo;
