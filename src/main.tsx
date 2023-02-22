import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Map from './Map';
import './styles/globals.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Map />,
		children: [
			{
				path: ':coordinates',
				element: <Map />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
