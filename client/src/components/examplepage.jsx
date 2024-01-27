import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { urlContext, userContext } from './context'
import '../styles/homepage.css'

function Example ({selectedDate, setSelectedDate}) {
    const APIurl = useContext(urlContext) 
    const userInfo = useContext(userContext)
    const myCity = userInfo.city
    const [examples, setExamples] = useState([])
    const [dateExamplesbyId, setDateExamplesbyId] = useState([])
    const [message, setMessage] = useState("")
    const [exampletoUpdate, setExampletoUpdate] = useState(null)
    const [updateCheck, setUpdateCheck] = useState(null)

    useEffect(() => {
        async function getDateExamplesbyId() {
            try {
                const response = await fetch(`${APIurl}/dateExamples/examples/${selectedDate}`)
                const data = await response.json();
                setDateExamplesbyId(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getDateExamplesbyId();
    }, [])

    // const updateBeenThere = async () => {
    //     console.log(exampletoUpdate)
    //     console.log(updateCheck)
    //     try {
    //         const response = await fetch(`${APIurl}/dateExamples/${exampletoUpdate}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 beenThere: updateCheck,
    //             }),
    //         })
    //         const result = await response.json
    //         setMessage("Updated!")
    //     } catch (error) {
    //         setMessage(error.message)
    //     }
    // }

    const exampleDatesList = 
        dateExamplesbyId.map((date) => {
            return (
                <div className="date example card">
                    <h3 className="title"> {date.name} </h3>
                    <p className="address"> {date.address} </p>
                    <p className="city"> {date.city}, {date.state} </p>
                    <img className="dateimage" src={date.imgUrl} />
                    <p className="datedescription"> {date.description} </p>
                    <p className="price"> {date.price} </p>
                    {/* <form className="doneform" onSubmit={(event) => {updateBeenThere(event)}} >
                        <label name="dateDone"> Have you been here? 
                            <input type="checkbox" defaultChecked={date.beenThere} onChange={(e)=>{setUpdateCheck(e.target.checked)}} /> 
                        </label> 
                        <button type="submit" onClick={()=>{setExampletoUpdate(date.exampleId)}}> Save </button> 
                    </form> */}
                    <a href={date.url} target="_blank"> Visit website </a>
                </div>
            )
        })
    
        
        


    return (
        <>
            <div className="dateListArea"> {exampleDatesList} </div> 
            {message && <p> {message} </p> }
            <div className="buttonArea"> 
            <button className="resetButton" onClick={() => {setSelectedDate(null); setMessage("")}}> See All Dates </button>
            </div>
        </>
    )
}

export default Example; 