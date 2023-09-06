import React from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function GetMap({items, category_filter, filter_name}) {
    //Converter
    const data = Object.values(items);

    //Chart filter and config
    function setCategory(type){
        sessionStorage.setItem(`chart_filter_${filter_name}_sess`, type);
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

    return (
        <div className='custom-tbody' style={{padding:"6px"}}> {/*Fix the max height*/}
            <p>Show {items.length} facilities</p>
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {getListCatAll(sessionStorage.getItem(`chart_filter_${filter_name}_sess`))}
                {
                    //Category type filter
                    category_filter.map((val, i, index) => {
                    if(val.type == sessionStorage.getItem(`chart_filter_${filter_name}_sess`)){
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
