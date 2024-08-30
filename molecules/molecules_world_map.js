import React from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MoleculesWorldMap(props) {
    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} style={{
                    default: {
                        fill: "grey",
                    },
                    hover: {
                        fill: "#212121",
                    },
                    pressed: {
                        fill: "#E42",
                    },
                    }} />
                ))
                }
            </Geographies> 
            {
                props.items.map((val, i, index) => {
                    let coor = val.coordinate.split(", ")
                    var lat = parseFloat(coor[0])
                    var long = parseFloat(coor[1])
                    i++

                    return (
                        <Marker coordinates={[long, lat]} key={i}>
                        <circle r={3} fill="#F53" />
                        </Marker>
                    );
                })
            }
        </ComposableMap>
    )
}
