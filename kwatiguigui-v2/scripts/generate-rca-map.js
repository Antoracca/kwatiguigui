const fs = require('fs');
const https = require('https');
const d3 = require('d3-geo');

const url = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries/CAF.geo.json';

https.get(url, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);

            // Create a projection fitting the CAF geometry nicely into an 800x800 box
            const projection = d3.geoMercator().fitSize([800, 800], parsedData);
            const pathGenerator = d3.geoPath().projection(projection);

            // Generate the SVG path data "d" string
            const d = pathGenerator(parsedData);

            // Generate React Component string
            const reactComponent = `
import { FC, SVGProps } from "react";

export const RcaMapBg: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 800 800"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="${d}" />
  </svg>
);
            `.trim();

            fs.writeFileSync('src/components/ui/rca-map-bg.tsx', reactComponent);
            console.log('Successfully generated RcaMapBg component!');

        } catch (e) {
            console.error(e.message);
        }
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
