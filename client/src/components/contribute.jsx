import React, { useEffect, useState, useContext } from 'react'
import { urlContext } from './context'

function Contribute() {
    const apiURL=useContext(urlContext)
    const [displayedForm, setDisplayedForm] = useState(null)
    const [dateListName, setDateListName] = useState("")
    const [atHome, setAtHome] = useState(false)
    const [dateListType, setDateListType] = useState("")
    const [dateListPrice, setDateListPrice] = useState("")
    const [dateListDescription, setDateListDescription] = useState("")
    const [dateListImg, setDateListImg] = useState("")
    const [message, setMessage] = useState("")

    const postDateList = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${apiURL}/dateList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: dateListName,
                    atHome: atHome,
                    type: dateListType,
                    price: dateListPrice, 
                    description: dateListDescription,
                    imgUrl: dateListImg,
                })
            })
            const result=await response.json()
            setMessage(result.message)
        }
        catch (error) {
            setMessage(error.message)
        }
    }

    const dateListForm = 
         (
        <form name="contributeDateList" onSubmit={postDateList}>
        <label> What would you call this date?  
            <input id="name" placeholder="name your date!" onChange={(event)=>{setDateListName(event.target.value)}}/> 
        </label> <br/>
        <label> Is this an at home date?  
            <input id="atHome" type="checkbox" onChange={(event) => {setAtHome(true)}}/> 
        </label> <br/>
        <label> What kind of date is it?
            <input id="type" onChange={(event)=>{setDateListType(event.target.value)}}/>  
        </label> <br/>
        <label> How much does it cost?
            <input id="price" placeholder="free-$$$$" onChange={(event)=>{setDateListPrice(event.target.value)}}/> 
        </label> <br/>
        <label> Tell us about your date:
            <input id="description" type="textbox" onChange={(event)=>{setDateListDescription(event.target.value)}} /> 
        </label> <br/>
        <label> Add an image URL:
            <input id="imgUrl" onChange={(event)=>{setDateListImg(event.target.value)}}/> 
        </label> <br/>
        <button type="submit"> Submit </button>
        </form>) 
    
    return(
    <>
        <h2> Add more date ideas! </h2>
        <button onClick={() => {setDisplayedForm("dateListForm")}}> Add a date idea </button>
        <button> Add a date example </button> 
        <button> Add a city </button>   
        {displayedForm === "dateListForm" && dateListForm}
        {message}
    </>
    )
}

export default Contribute; 