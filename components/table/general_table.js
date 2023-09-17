import React from 'react'

import PageBar from '../navbar/page_bar'
import GetOrdering from '../controls/ordering'
import GetLimit from '../controls/limit';

export default function GetGeneralTable({builder, items, maxPage, currentPage, ctx}) {
    return (
        <div className='custom-tbody'>
            <GetOrdering ctx={ctx}/>
            <GetLimit ctx={ctx}/>
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
            <PageBar curr={currentPage} max={maxPage} ctx={ctx}/>
        </div>
    );
}
  