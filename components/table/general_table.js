import React from 'react'
import Image from 'next/image'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

export default function GetGeneralTable({builder, items, maxPage}) {
    //Converter
    const data = Object.values(items);

    //Chart filter and config
    function setLimit(page){
        sessionStorage.setItem("Table_Aircraft", page);
        location.reload();
    }

    return (
        <div className='custom-tbody'>
            <p>Page : {sessionStorage.getItem("Table_Aircraft")} / {maxPage}</p>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <FontAwesomeIcon icon={faEllipsisVertical}/></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <a className="dropdown-item">
                            <label className='input-number-label'>Chart Page <span className='label-max'>Max : {maxPage}</span></label>
                            <input type="number" className='form-control' min="1" max={maxPage} defaultValue={sessionStorage.getItem("Table_Aircraft")} onBlur={(e)=> setLimit(e.target.value)}></input>
                        </a>
                    </li>
                </ul>
            </div>
            <table className="table">
                <thead>
                    <tr key={"a"}>
                    {
                        builder.map((val, i, index) => {
                            if(i == 0){
                                return (
                                    <th scope="col">{val['column_name']}</th>
                                );
                            } else {
                                return (
                                    <td>{val['column_name']}</td>
                                );
                            }
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, i, idx) => {
                            return (
                                <tr key={i}>
                                {
                                    builder.map((build, j, ins) => {
                                        if(i == 0){
                                            return (
                                                <th scope="row">{item[build['object_name']]}</th>
                                            );
                                        } else {
                                            return (
                                                <th>{item[build['object_name']]}</th>
                                            );
                                        }
                                    })
                                }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
  