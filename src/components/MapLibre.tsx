import {onMount} from "solid-js";
import {Map as MapLibree, Marker} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import pgkGraphData from "../../public/pgk_graph.json";

export default function MapLibre() {

    onMount(() => {

        const map = new MapLibree({
            container: "maplibre",
            style: "https://api.maptiler.com/maps/backdrop/style.json?key=XE0P2vcwLT05i3WEoIqW"
        });

        const nodeMap = new Map<string, [string, string]>();

        for (let i = 0; i < pgkGraphData.elements.nodes.length; i++) {

            const node = pgkGraphData.elements.nodes[i];

            const lon = node.data.lon;
            const lat = node.data.lat;

            if (!lon || !lat) continue;

            nodeMap.set(node.data.id, [lon, lat]);
        }

        const pointCoords = Array
            .from(nodeMap.values())
            .map(coords => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: coords
                }
            }));

        // const linesCoords: {type: "Feature", geometry: {type: "LineString", coordinates: string[][]}}[] = [];
        //
        // for (let i = 0; i < pgkGraphData.elements.edges.length; i++) {
        //
        //     const edge = pgkGraphData.elements.edges[i].data;
        //
        //     const startPoint = nodeMap.get(edge.source);
        //     const endPoint = nodeMap.get(edge.target);
        //
        //     if (!startPoint || !endPoint) {
        //         console.log(`Missing points in edge ${edge.id}: ${startPoint} -> ${endPoint}`);
        //         continue;
        //     }
        //
        //     linesCoords.push({
        //         type: "Feature",
        //         geometry: {
        //             type: "LineString",
        //             coordinates: [
        //                 startPoint,
        //                 endPoint
        //             ]
        //         }
        //     });
        // }

        setInterval(() => {
            console.log(`z=${map.getZoom()},ll=${JSON.stringify(map.getCenter())}`);
        }, 3000);

        map.on('load', () => {
            new Marker()
                .setLngLat([40.3353, 63.0738])
                .addTo(map);
            new Marker()
                .setLngLat([37.751, 59.1417])
                .addTo(map);
            map.addSource('points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: pointCoords
                }
            });
            map.addLayer({
                id: 'points',
                type: 'circle',
                source: 'points',
                paint: {
                    "circle-color": "#0D60D3",
                    "circle-radius": 2
                }
            });
            map.setPaintProperty("points", "circle-radius", [
                'interpolate',
                ["exponential", 3],
                ["zoom"],
                1,
                2,
                10,
                20
            ]);
            // map.addSource('lines', {
            //     type: 'geojson',
            //     data: {
            //         type: 'FeatureCollection',
            //         features: linesCoords
            //     }
            // });
            // map.addLayer({
            //     id: 'lines',
            //     type: 'line',
            //     source: 'lines',
            //     paint: {
            //         "line-width": 3,
            //         "line-color": "#f13f3f"
            //     }
            // });

            map.easeTo({
                zoom: 2.838933835474956,
                center: [90.5263936194466, 57.09306321595406],
                duration: 3333
            });
        });
    });

    return <div id={"maplibre"} style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    }}></div>;
}
