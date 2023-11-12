import {For} from "solid-js";

export default function MapUi() {

   return <section style={{
        position: "absolute",
        top: 0,
        left: 0,
       width: "100%",
       height: "100%",
       display: "grid",
       "grid-template-columns": "1fr",
       "grid-template-rows": "1fr",
       "align-items": "center",
       "justify-items": "center",
       "pointer-events": "none"
    }}>
       <div style={{
           "border-radius": "2em",
           "background": "white",
           width: "40vw",
           display: "grid",
           "grid-template-columns": "min-content 1fr min-content",
           "justify-items": "center",
           padding: "0 1em 0 1em",
           "-webkit-box-shadow": "0px 0px 24px 23px rgba(0, 0, 0, 0.26)",
           "-moz-box-shadow": "0px 0px 24px 23px rgba(0, 0, 0, 0.26)",
           "box-shadow": "0px 0px 24px 23px rgba(0, 0, 0, 0.26)"
       }}>
           <p>123</p>
           <p>Чтобы начать введите номер...</p>
           <p>123</p>
       </div>
    </section>;

}
