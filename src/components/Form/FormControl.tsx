import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import { getSuggestions } from '../../lib/api/getRouteData';
import { debounce } from '../../lib/helpers/debounce';

interface props {
	id: 'startingPoint' | 'endingPoint';
	label: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSetValueFromSuggestion: (
		id: 'startingPoint' | 'endingPoint',
		suggestion: string
	) => void;
}

function FormControl({
	id,
	label,
	placeholder,
	value,
	onChange,
	handleSetValueFromSuggestion
}: props) {
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggsestions, setShowSuggsestions] = useState(false);
	const autocompleteRef = useRef();

	const handleOutsideClick = (e) => {
		if (
			autocompleteRef.current &&
			!autocompleteRef.current.contains(e.target)
		) {
			setShowSuggsestions(false);
		}
	};

	const sendRequest = useCallback(async (value: string) => {
		if (value) {
			const res = await getSuggestions(value);
			if (res) return setSuggestions(res);
		}
		return setSuggestions([]);
	}, []);

	const debounceSendRequest = useMemo(() => {
		return debounce(sendRequest, 500);
	}, [sendRequest]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e);
		debounceSendRequest(e.target.value);
	};

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [value]);

	return (
		<div className="mb-4">
			<label htmlFor={id}>{label}</label>
			<div className={` relative `} ref={autocompleteRef}>
				<input
					className={`p-2 w-full bg-black focus:outline-none z-10 ${
						showSuggsestions && suggestions.length > 0
							? 'rounded-t-md'
							: 'rounded-md'
					}`}
					type="text"
					name={id}
					id={id}
					value={value}
					onChange={handleChange}
					onFocus={() => setShowSuggsestions(true)}
					placeholder={placeholder}
					autoComplete="off"
				/>
				{showSuggsestions && suggestions.length > 0 && (
					<ul
						className="p-1 block w-full max-h-48 absolute border-t border-zinc-900 rounded-b-md font-normal bg-black text-white z-50 overflow-auto"
						tabIndex={-1}>
						{suggestions.map((suggestion) => (
							<li
								className="p-1 pt-2 pb-2 truncate rounded-md text-zinc-400 hover:bg-[#14b8a6] hover:text-black cursor-pointer"
								onClick={() => {
									handleSetValueFromSuggestion(id, suggestion.address.label);
									setShowSuggsestions(false);
								}}
								key={suggestion.address.label}
								tabIndex={0}>
								{suggestion.address.label}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default FormControl;
