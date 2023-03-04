import { XMarkIcon } from '@heroicons/react/24/solid';
import '../../styles/home.css';

interface props {
	onClick: () => void;
}

function CloseIcon({ onClick }: props): JSX.Element {
	return (
		<div className="close" onClick={() => onClick()}>
			<XMarkIcon width={35} height={35} />
		</div>
	);
}

export default CloseIcon;
