import {Title} from "solid-start";
import "ol/ol.css";
import OpenLayerMap from "~/components/OpenLayerMap";
import PlotlyGraph from "~/components/PlotlyGraph";
import CytoscapeGraph from "~/components/CytoscapeGraph";
import MapLibre from "~/components/MapLibre";
import MapUi from "~/components/MapUi";

export default function Home() {
    return (
        <main>
            <div style={{
                position: "relative",
                width: "100%",
                height: "100vh"
            }}>
                <MapLibre/>
                <MapUi/>
            </div>
            {/*<CytoscapeGraph/>*/}
            {/*<PlotlyGraph/>*/}
            {/*<OpenLayerMap/>*/}
            {/*<Title>ПГК DataWagon!</Title>*/}
            {/*<h1>ПГК DataWagon!</h1>*/}
            {/*<Counter/>*/}
        </main>
    );
}
