import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { urlContext } from './context'
import '../styles/homepage.css'

function Example ({selectedDate, setSelectedDate}) {
    const APIurl = useContext(urlContext) 
    const [dateExamples, setDateExamples] = useState([])
    
    useEffect(() => {
        async function getDateExamples() {
            try {
                const response = await fetch(`${APIurl}/dateExamples/examples/${selectedDate}`)
                const data = await response.json();
                setDateExamples(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getDateExamples();
    }, [])
    {console.log(dateExamples)}

    const exampleDatesList =
        dateExamples.map((date) => {
            return (
                <div className="date example card">
                    <h3 className="title"> {date.name} </h3>
                    <p className="address"> {date.address} </p>
                    <p className="city"> {date.city}, {date.state} </p>
                    <img className="dateimage" src={date.imgUrl} />
                    <p className="datedescription"> {date.description} </p>
                    <p className="price"> {date.price} </p>
                    <p className="beenThere"> {date.beenThere} </p>
                    <a href={date.url} target="_blank"> Visit website </a>
                </div>
            )
        })
    return (
        <>
            <div className="dateListArea"> {exampleDatesList} </div> 
            <button className="resetButton" onClick={() => {setSelectedDate(null)}}> See All Date Ideas </button>
        </>
    )
}

export default Example; 