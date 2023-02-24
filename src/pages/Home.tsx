import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/home.css';

function Home() {
	const [expandNav, setExpandNav] = useState(false);

	const handleExpandNavbar = () => {
		setExpandNav((prev) => !prev);
	};

	useEffect(() => {
		if (expandNav) document.documentElement.style.position = 'fixed';
	}, [expandNav]);
	return (
		<div className="home-page">
			<div
				className="navbar bg-black text-white md:flex-1"
				data-expand={expandNav}>
				<div className="container p-4 font-semibold tracking-tight text-gray-100">
					<div className="mb-5">
						<h1 className="text-3xl font-bold text-white">Route:</h1>
						<div className="p-3 bg-zinc-900 rounded-lg">
							<div>
								<label htmlFor="startingPoint">Start</label>
								<input
									className="block w-full p-2 rounded-md font-normal bg-black text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
									type="text"
									name="startingPoint"
									id="startingPoint"
									placeholder="E.g. 123 Main Street, Anytown, USA"
								/>
							</div>
							<div>
								<label htmlFor="endingPoint">End</label>
								<input
									className="block w-full p-2 rounded-md font-normal bg-black text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
									type="text"
									name="endingPoint"
									id="endingPoint"
									placeholder="E.g. 456 High Street, Cityville, Canada"
								/>
							</div>
						</div>
					</div>

					<div>
						<h1 className="text-3xl font-bold text-white">Last routes:</h1>
						<div className="mb-3 p-3 bg-zinc-900 rounded-lg border border-zinc-900 hover:border-[#14b8a6] hover:cursor-pointer">
							<p>
								From:{' '}
								<span className="font-normal text-zinc-400">
									123 Main Street, Anytown, USA
								</span>
							</p>
							<p className="mt-1">
								To:{' '}
								<span className="font-normal text-zinc-400">
									456 High Street, Cityville, Canada
								</span>
							</p>
							<div className="flex gap-3">
								<p className="mt-1">
									Distance:{' '}
									<span className="font-normal text-zinc-400">123 km</span>
								</p>
								<p className="mt-1">
									Duration:{' '}
									<span className="font-normal text-zinc-400">120min</span>
								</p>
							</div>
						</div>
						{/* <div className="mb-3 p-3 bg-zinc-900 rounded-lg border border-zinc-900 hover:border-[#14b8a6] hover:cursor-pointer">
							<p>
								From:{' '}
								<span className="font-normal text-zinc-400">
									123 Main Street, Anytown, USA
								</span>
							</p>
							<p className="mt-2">
								To:{' '}
								<span className="font-normal text-zinc-400">
									456 High Street, Cityville, Canada
								</span>
							</p>
							<div className="flex gap-3">
								<p className="mt-2">
									Distance:{' '}
									<span className="font-normal text-zinc-400">123 km</span>
								</p>
								<p className="mt-2">
									Duration:{' '}
									<span className="font-normal text-zinc-400">120min</span>
								</p>
							</div>
						</div>
						<div className="mb-3 p-3 bg-zinc-900 rounded-lg border border-zinc-900 hover:border-[#14b8a6] hover:cursor-pointer">
							<p>
								From:{' '}
								<span className="font-normal text-zinc-400">
									123 Main Street, Anytown, USA
								</span>
							</p>
							<p className="mt-2">
								To:{' '}
								<span className="font-normal text-zinc-400">
									456 High Street, Cityville, Canada
								</span>
							</p>
							<div className="flex gap-3">
								<p className="mt-2">
									Distance:{' '}
									<span className="font-normal text-zinc-400">123 km</span>
								</p>
								<p className="mt-2">
									Duration:{' '}
									<span className="font-normal text-zinc-400">120min</span>
								</p>
							</div>
						</div>
						<div className="mb-3 p-3 bg-zinc-900 rounded-lg border border-zinc-900 hover:border-[#14b8a6] hover:cursor-pointer">
							<p>
								From:{' '}
								<span className="font-normal text-zinc-400">
									123 Main Street, Anytown, USA
								</span>
							</p>
							<p className="mt-2">
								To:{' '}
								<span className="font-normal text-zinc-400">
									456 High Street, Cityville, Canada
								</span>
							</p>
							<div className="flex gap-3">
								<p className="mt-2">
									Distance:{' '}
									<span className="font-normal text-zinc-400">123 km</span>
								</p>
								<p className="mt-2">
									Duration:{' '}
									<span className="font-normal text-zinc-400">120min</span>
								</p>
							</div>
						</div>
						<div className="mb-3 p-3 bg-zinc-900 rounded-lg border border-zinc-900 hover:border-[#14b8a6] hover:cursor-pointer">
							<p>
								From:{' '}
								<span className="font-normal text-zinc-400">
									123 Main Street, Anytown, USA
								</span>
							</p>
							<p className="mt-2">
								To:{' '}
								<span className="font-normal text-zinc-400">
									456 High Street, Cityville, Canada
								</span>
							</p>
							<div className="flex gap-3">
								<p className="mt-2">
									Distance:{' '}
									<span className="font-normal text-zinc-400">123 km</span>
								</p>
								<p className="mt-2">
									Duration:{' '}
									<span className="font-normal text-zinc-400">120min</span>
								</p>
							</div>
						</div> */}
					</div>
				</div>
			</div>
			<Outlet />
		</div>
	);
}

export default Home;
