import React from 'react'
import Image from 'next/image'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import PageBar from '../navbar/page_bar'

export default function GetGeneralTable({builder, items, maxPage, currentPage}) {
    //Converter
    const data = Object.values(items);

    return (
        <div className='custom-tbody'>
            <PageBar curr={currentPage} max={maxPage}/>
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
  