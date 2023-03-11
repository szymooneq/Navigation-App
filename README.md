# Navigation App

![Thumbnail](./src/assets/_thumbnail.jpg)

Web navigation app that allows users to input a desired route and instantly view it on the map, complete with estimated distance and time of travel.

https://navigation-sd.vercel.app/map

## Main technologies

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwind_css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-FFFFFF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjllbSIgaGVpZ2h0PSIxZW0iIHZpZXdCb3g9IjAgMCA0NjAgNTEyIj48cGF0aCBmaWxsPSIjODNDMDQxIiBkPSJNMTU2LjQ4MyA0OTguNTdjLTI4LjE1NCAyNi40NjgtNzcuMjkyIDExLjQwOC0xMDguNTYyLTI0LjE3NkM2LjQgNDI3LjE0OC04LjYzMSAzMzcuNjY4IDQuNzU0IDI1Ny44NzNsMTUxLjcyOSAyNDAuNjk2em0zMi43MzItMzAuNTEyYy0xOC4yMjgtNy43NDctOTEuNDU4LTQ1LjU1My02Mi40NjMtMTc5Ljc2QzgwLjMwMiAyNTcuNzY0IDEzLjY0NCAyMzQuOCA5LjM3OCAyMjkuODJjMCAwIC4xNzQgOC4wNzMtMS45NjIgMjMuOTAybDE1Ny42MzcgMjM1LjM1YzMuOTE2LTcuNzE4IDE0LjMtMTMuODc4IDI0LjE2Mi0yMS4wMTR6bS00OS43ODYtNzkuNTc5YzE1LjU0MyA1MS4xODIgNDMuMDQzIDU3LjIzMiA2My4zMTUgNjkuODlMNDA4LjU4NSAxNy45OTJoMi40MzVMMjE5LjkxMyA0NzIuOTk1YzE5LjM4MSAxOC4yNzQgNDUuMjM1IDM2LjY0NyA4NC4wMzggMjcuOTAyQzQ2My45MDggNDcyLjMyNCA1MDAuNDI4IDIxNC4yNSA0MTMuOTAyIDBDMzEyLjE0NyA2OS43OTQgMjM1Ljk5OCAxMDcuNDI4IDE4Ni4zMiAxODEuMzE0Yy0zOC42MzggNTcuNDY3LTY4LjYxMiAxMzguMzk2LTQ2Ljg5MSAyMDcuMTY1eiIvPjwvc3ZnPg==)

## Stack

- [Heroicons](https://heroicons.com/) - beautiful hand-crafted SVG icons, by the makers of Tailwind CSS
- [Leaflet](https://leafletjs.com) - an open-source JavaScript library for mobile-friendly interactive maps
- [Leaflet Locate Control](https://github.com/domoritz/leaflet-locatecontrol) - useful control to geolocate the user with many options. Official Leaflet and MapBox plugin
- [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine) - an easy, flexible and extensible way to add routing to a Leaflet map
- [React Leaflet](https://react-leaflet.js.org) - React components for Leaflet maps
- [React Router](https://reactrouter.com/en/main) - a standard library for routing in React
- [ReactToPrint](https://github.com/gregnb/react-to-print) - library with ability to print React components in the browser
- [Vite](https://vitejs.dev) - a new breed of frontend build tooling that significantly improves the frontend development experience
- [vite-plugin-rewrite-all](https://github.com/ivesia/vite-plugin-rewrite-all) - plugin that fix dev server not rewriting the path includes a dot vite#2190

## Details

- created with React (Vite) and TypeScript
- context and reducer for managing global state
- locating your current location
- map tiles provided by Mapbox
- finding addresses and coordinates with the Here API
- create routes with the accuracy of the house number
- create routes by dragging markers on the map
- loading a route from a URL search params
- loading recently saved routes
- calculation of travel costs
- printing route details with ReactToPrint
- routing with React Router
- unit testing with Jest
- responsive website design
- styling with Tailwind CSS

## Tutorial and project structure

Inside the project you'll see the following folders and files:

```
PROJECT_ROOT
├── public              # static assets
└── src
    ├── assets          # images
    ├── components      # React components
    ├── lib
    │   ├── api         # API functions
    │   ├── context     # React context and reducer files
    │   ├── helpers     # helpful functions
    │   ├── interfaces  # TypeScript interfaces
    │   └── test        # Jest test functions
    ├── pages           # page files
    └── styles          # style files
```

Download the repository to your local machine and run to download all missing dependencies:

```
yarn install
```

After that you can run this project with:

```
yarn dev
```

To build your application use:

```
yarn build
```

**The application requires a connection to Here API. To do this, you need to create an account on https://platform.here.com, create a new project, add _Autocomplete, Forward Geocoder, Reverse Geocoder_ services and generate a token that will enable communication with the API.**

**In addition to this, you will need a link to a Leaflet-supported map tiles (e.g. Mapbox).**

After these operations, create a `.env.local` file with the following data in the main folder and restart your application:

```
VITE_HERE_API_KEY = YOUR_HERE_API_TOKEN
VITE_MAP_TILES = YOUR_MAP_TILES_LINK
```
