import React from "react"
import { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
  //Initial variable
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);

  //Converter
  const data = Object.values(items);

  useEffect(() => {
    //Default config
    if(sessionStorage.getItem("ChartType_FacilitiesType") == null){
      sessionStorage.setItem("ChartType_FacilitiesType", "NULL");
    }

    fetch("https://ww2.leonardhors.site/api/v1/facilities/bylocation/"+sessionStorage.getItem("ChartType_FacilitiesType"))
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

  useEffect(() => {
    fetch("https://ww2.leonardhors.site/api/v1/facilities/type")
    .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true);
            setItems2(result.data);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
    )
  },[])

  //Chart filter and config
  function setCategory(type){
    sessionStorage.setItem("ChartType_FacilitiesType", type);
    location.reload();
  }

  function getListCatAll(slct){
    if(slct != "NULL"){
      return (
        <li key={0}><a className="dropdown-item" onClick={(e)=> setCategory("NULL")}>All</a></li>
      );
    } else {
      return (
        <li key={0}><a className="dropdown-item" onClick={(e)=> setCategory("NULL")}><FontAwesomeIcon icon={faCheck}/> All</a></li>
      );
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
        <div>
            {/* <Image
                src="/loading.gif"
                alt="Vercel Logo"
                className='loading-logo'
                width={100}
                height={100}
                priority
            /> */}
            <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
        </div>
    );
  } else {
    return (
      <div className='custom-tbody' style={{padding:"6px"}}> {/*Fix the max height*/}
        <h6>All Facilities Location</h6>
        <p>Show {items.length} facilities</p>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faEllipsisVertical}/></button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {getListCatAll(sessionStorage.getItem("ChartType_FacilitiesType"))}
              {
                //Category type filter
                items2.map((val, i, index) => {
                  if(val.type == sessionStorage.getItem("ChartType_FacilitiesType")){
                    return (
                        <li key={i}><a className="dropdown-item" onClick={(e)=> setCategory(val.type)}><FontAwesomeIcon icon={faCheck}/> {val.type}</a></li>
                    );
                  } else {
                    return (
                        <li key={i}><a className="dropdown-item" onClick={(e)=> setCategory(val.type)}>{val.type}</a></li>
                    );
                  }
                })
              }
            </ul>
        </div>
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
}
