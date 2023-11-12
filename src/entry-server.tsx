import {createHandler, renderAsync, StartServer,} from "solid-start/entry-server";
import * as fs from "fs";
import {EOL} from "os";
import cytoscape from "cytoscape";
import pgkGraphData from "../public/pgk_graph.json";

export default createHandler(
    renderAsync((event) => {

        const needToRefreshGraphData = false;

        if (needToRefreshGraphData) {
            const result: {
                elements: {
                    nodes: {
                        data: {
                            id: string,
                            lat?: string,
                            lon?: string
                        }
                    }[],
                    edges: {
                        data: {
                            id: string,
                            source: string,
                            target: string
                        }
                    }[],
                    lengths: object
                }
            } = {
                elements: {
                    nodes: [],
                    edges: [],
                    lengths: {}
                }
            };


            const coordsData = fs.readFileSync("public/STATION_COORDS_HACKATON.tsv", "utf-8");
            const coordsLines = coordsData.split(EOL);

            const stationIds = new Set<string>();

            for (let i = 1; i < coordsLines.length; i++) {
            // for (let i = 1; i < 2000; i++) {
                const line = coordsLines[i].split("\t");
                const id = line[0];
                stationIds.add(id);
                const latitude = line[1];
                const longitude = line[2];
                result.elements.nodes.push({data: {id: id, lat: latitude, lon: longitude}});
            }

            const graphData = fs.readFileSync("public/PEREGON_HACKATON.tsv", "utf-8");
            const graphLines = graphData.split(EOL);

            for (let i = 1; i < graphLines.length; i++) {
            // for (let i = 1; i < 100; i++) {

                const line = graphLines[i].split("\t");
                const start = line[0];
                const end = line[1]
                const edgeId = `${start}_${end}`;
                const length = parseInt(line[2]);

                if (!stationIds.has(start) || !stationIds.has(end)) {
                    console.warn(`Original stations list does not contains edge's start '${start}' or end '${end}' (${edgeId})`);
                    continue;
                }

                result.elements.edges.push({data: {id: edgeId, source: start, target: end}});
                // @ts-ignore
                result.elements.lengths[edgeId] = length;
            }

            // const cy = cytoscape({
            //     elements: result.elements,
            //     layout: {
            //         name: "cose",
            //         idealEdgeLength(edge: any): number {
            //             const id = edge._private.data.id;
            //             const length = pgkGraphData.elements.lengths[id];
            //             return length * 10;
            //         }
            //     }
            // });
            //
            // cy.nodes().filter((ele) => ele.degree(true) < 1).remove();
            // const cleanGraph = cy.json();

            fs.writeFileSync("public/pgk_graph.json", JSON.stringify(result, undefined, 2), {encoding: "utf-8"});
            console.log("Reformat graph data saved");
        }

        return <StartServer event={event}/>;
    })
);
