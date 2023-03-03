import './spinner.css';

function Spinner(): JSX.Element {
	return (
		<div className="flex items-center justify-center w-screen h-screen fixed bg-[#00000075] z-[9999999]">
			<div className="lds-ring">
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
}

export default Spinner;
