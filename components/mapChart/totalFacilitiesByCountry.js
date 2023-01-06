import React from "react"
import { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
  //Initial variable
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  //Converter
  const data = Object.values(items);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/facilities/bylocation")
    .then(res => res.json())
      .then(
      (result) => {
        setIsLoaded(true);
        setItems(result.data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  },[])

  return (
    <div className='custom-tbody' style={{padding:"6px"}}> {/*Fix the max height*/}
      <h6>All Facilities Location</h6>
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
          items.map((val, i, index) => {
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
    </div>
  )
}
