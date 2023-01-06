import React from 'react'
import { useState, useEffect } from "react"
import Image from 'next/image'

const AllBooks = () => {
    //Initial variable
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //Converter
    const data = Object.values(items);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/books/limit/15/order/ASC?page=1")
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result.data.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])

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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Reviewer</th>
                            <th scope="col">Review Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((val, i, index) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{val.title}</th>
                                        <td>{val.author}</td>
                                        <td>{val.reviewer}</td>
                                        <td>{val.review_date}</td>
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
  
export default AllBooks;
  