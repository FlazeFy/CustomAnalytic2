import React from 'react'

import PageBar from '../organisms/organisms_page_bar'
import MoleculesFilterOrdering from './molecules_filter_ordering'
import TemplateManageModal from '../templates/templates_manage_modal'
import MoleculesFilterSearch from './molecules_filter_search'
import MoleculesFilterLimit from './molecules_filter_limit'

export default function MoleculesTable({builder, items, maxPage, currentPage, ctx}) {
    const getExtraDesc = (ext, val) => {
        if(ext != null){
            if(ext['pos'] == "start"){
                return `${ext['desc']} ${val}`
            } else if(ext['pos'] == "end") {
                return `${val} ${ext['desc']}`
            } 
        } else {
            return val
        }
    }

    return (
        <div className='custom-tbody'>
            <MoleculesFilterSearch placeholder={"test"} ctx={ctx}/>
            <MoleculesFilterOrdering ctx={ctx}/>
            <MoleculesFilterLimit ctx={ctx} type={"table"}/>
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
                                        if(item[build['column_name']] != 'Manage' && item[build['object_name']] != null){
                                            if(i == 0){
                                                return (
                                                    <th scope="row">{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                );
                                            } else {
                                                return (
                                                    <th>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                );
                                            }
                                        } else {
                                            return (
                                                <th><TemplateManageModal builder={builder} items={item} id={i}/></th>
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
  