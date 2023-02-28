import React, { useState } from 'react';

interface props {
	id: string;
	label: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const options = [
	'Orangeeeeeeeeeeeeeeeee eeeeeeeeee eeeeeeeeeeee eeeeeeeeee',
	'Apples',
	'Pearls',
	'Pearls',
	'Pearls',
	'Pearls',
	'Pearls'
];

function FormControl({ id, label, placeholder, value, onChange }: props) {
	const [showSuggsestions, setShowSuggsestions] = useState(false);
	const suggestions = options.filter((option) =>
		option.toLocaleLowerCase().includes(value.toLowerCase())
	);
	/* focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6] */
	return (
		<div className="mb-4">
			<label htmlFor={id}>{label}</label>
			<div className="rounded-md bg-black relative ">
				<input
					className="block w-full p-2 rounded-md font-normal bg-black text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
					type="text"
					name={id}
					id={id}
					value={value}
					onChange={onChange}
					onFocus={() => setShowSuggsestions(true)}
					placeholder={placeholder}
				/>
				{/* rounded-md w-full absolute top-10 left-0 right-0 bg-black z-50 border-2 */}
				{showSuggsestions && (
					<ul
						className="block p-2 w-full max-h-56 border-zinc-900 border rounded-md font-normal bg-black text-white absolute top-11 right-0 z-20 focus:outline-none focus:ring-2 focus:ring-[#14b8a6] overflow-scroll"
						tabIndex={-1}>
						{suggestions.map((suggestion) => (
							<li
								className="p-2 rounded-md truncate cursor-pointer hover:bg-[#14b8a6] hover:text-black"
								key={suggestion}
								tabIndex={0}>
								{suggestion}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default FormControl;
