import {onMount} from "solid-js";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import VectorLayer from "ol/layer/Vector";

export default function OpenLayerMap() {

    onMount(() => {

        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new VectorLayer({})
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
    });


    return <div id={"map"} style={{
        width: "100%",
        height: "50vh"
    }}/>;
}
