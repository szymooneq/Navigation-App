import { PrinterIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface props {
	className: string;
	children: React.ReactNode;
}

function PrintWrapper({ className, children }: props) {
	const contentRef = useRef<HTMLDivElement>(null);

	const handlePrint = useReactToPrint({
		content: () => contentRef.current,
		documentTitle: 'emp-data'
	});

	return (
		<div className={className} ref={contentRef}>
			{children}
			<button
				className="print absolute top-2 right-2 text-[#14b8a6]"
				onClick={handlePrint}>
				<PrinterIcon width={30} height={30} />
			</button>
		</div>
	);
}

export default PrintWrapper;
