import {onMount} from "solid-js";
import cytoscape from "cytoscape";
import pgkGraphData from "../../public/pgk_graph.json";

export default function CytoscapeGraph() {

    let cyContainer: HTMLElement | undefined;

    onMount(() => {

        console.log("Creating graph");
        const cy = cytoscape({
            container: cyContainer,
            elements: pgkGraphData.elements,
            layout: {
                // name: "concentric",
                name: "cose",
                animate: false,
                idealEdgeLength(edge: any): number {
                    const id = edge._private.data.id;
                    const length = pgkGraphData.elements.lengths[id];
                    return length * 10;
                },
                ready(e): void { console.log("Graph ready after layout");}
            }
        });

        cy.nodes().filter((ele) => ele.degree(true) < 1).remove();
        cy.layout({
            // name: "concentric",
            name: "cose",
            animate: false,
            idealEdgeLength(edge: any): number {
                const id = edge._private.data.id;
                const length = pgkGraphData.elements.lengths[id];
                return length * 10;
            },
            ready(e): void { console.log("Graph ready after layout");}
        });

    });

    return <div ref={e => cyContainer = e} style={{
        width: "100%",
        height: "94vh"
    }}></div>;
}
