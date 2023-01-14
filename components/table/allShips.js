import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

const AllShips = () => {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [maxPage, setMaxPage] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        //Default config
        if(sessionStorage.getItem("ChartPage_ShipsByCountry") == null){
            sessionStorage.setItem("ChartPage_ShipsByCountry", "1");
        }

        fetch("http://127.0.0.1:8000/api/ships/limit/15/order/ASC?page="+sessionStorage.getItem("ChartPage_ShipsByCountry"))
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setMaxPage(result.data.last_page);
                setItems(result.data.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

    //Chart filter and config
    function setLimit(page){
        sessionStorage.setItem("ChartPage_ShipsByCountry", page);
        location.reload();
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
            <div className='custom-tbody'>
                <p>Page : {sessionStorage.getItem("ChartPage_ShipsByCountry")} / {maxPage}</p>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <a className="dropdown-item">
                                <label className='input-number-label'>Chart Page <span className='label-max'>Max : {maxPage}</span></label>
                                <input type="number" className='form-control' min="1" max={maxPage} defaultValue={sessionStorage.getItem("ChartPage_ShipsByCountry")} onBlur={(e)=> setLimit(e.target.value)}></input>
                            </a>
                        </li>
                    </ul>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Country</th>
                            <th scope="col">Launch Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((val, i, index) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{val.name}</th>
                                        <td>{val.class}</td>
                                        <td>{val.country}</td>
                                        <td>{val.launch_year}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
  
export default AllShips;
  