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
                    <tr>
                    {
                        builder.map((val, idx) => {
                            if(idx == 0){
                                return (
                                    <th scope="col" key={`thead_${idx}`}>{val['column_name']}</th>
                                );
                            } else {
                                return (
                                    <td key={`thead_${idx}`}>{val['column_name']}</td>
                                );
                            }
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, idx) => {
                            return (
                                <tr key={`tbody_${idx}`}>
                                {
                                    builder.map((build, jdx) => {
                                        if(item[build['column_name']] != 'Manage' && item[build['object_name']] != null){
                                            if(idx == 0){
                                                return (
                                                    <th scope="row" key={`tbody_${idx}_${jdx}`}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                );
                                            } else {
                                                return (
                                                    <th key={`tbody_${idx}_${jdx}`}>{getExtraDesc(build['extra_desc'], item[build['object_name']])}</th>
                                                );
                                            }
                                        } else {
                                            return (
                                                <th key={`tbody_${idx}_${jdx}`}><TemplateManageModal builder={builder} items={item} id={idx}/></th>
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
  