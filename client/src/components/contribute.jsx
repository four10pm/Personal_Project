import React, { useEffect, useState, useContext } from 'react'
import { urlContext } from './context'
import '../styles/contribute.css'

function Contribute() {
    const apiURL=useContext(urlContext)
    const [displayedForm, setDisplayedForm] = useState(null)
    const [message, setMessage] = useState("")

    const [dateListName, setDateListName] = useState("")
    const [atHome, setAtHome] = useState(false)
    const [dateListType, setDateListType] = useState("")
    const [dateListPrice, setDateListPrice] = useState("")
    const [dateListDescription, setDateListDescription] = useState("")
    const [dateListImg, setDateListImg] = useState("")
   
    const [dateExampleName, setDateExampleName] = useState("")
    const [dateExamplePrice, setDateExamplePrice] = useState("")
    const [dateExampleDescription, setDateExampleDescription] = useState("")
    const [dateExampleUrl, setDateExampleUrl] = useState("")
    const [dateExampleImg, setDateExampleImg] = useState("")
    const [dateExampleAddress, setDateExampleAddress] = useState("")
    const [dateExampleCity, setDateExampleCity] = useState(null)
    const [dateExampleType, setDateExampleType] = useState(null)

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

    const postDateExample = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${apiURL}/dateExamples`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: dateExampleName,
                    address: dateExampleAddress, 
                    price: dateExamplePrice,
                    description: dateExampleDescription,
                    url: dateExampleUrl,
                    imgUrl: dateExampleImg,
                    city: dateExampleCity,
                    dateId: dateExampleType
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
        <form name="contributeDateList" className="contributeform" onSubmit={postDateList}>
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

const dateExampleForm = 
(
<form name="contributeDateList" className="contributeform" onSubmit={postDateExample}>
<label> What would you call this date?  
   <input id="name" placeholder="name your date!" onChange={(event)=>{setDateExampleName(event.target.value)}}/> 
</label> <br/>
<label> What's the address?
    <input id="address" onChange={(event) => {setDateExampleAddress(event.target.value)}} /> 
</label> <br/> 
<label> Which city is it in? 
    <input id="city" type="integer" onChange={(event) => {setDateExampleCity(event.target.value)}} /> 
</label> 
<label> What kind of date is it?
   <input id="type" onChange={(event)=>{setDateExampleType(event.target.value)}}/>  
</label> <br/>
<label> How much does it cost?
   <input id="price" placeholder="free-$$$$" onChange={(event)=>{setDateExamplePrice(event.target.value)}}/> 
</label> <br/>
<label> Tell us about your date:
   <input id="description" type="textbox" onChange={(event)=>{setDateExampleDescription(event.target.value)}} /> 
</label> <br/>
<label> Link to the website: 
    <input id="url" onChange={(event) => {setDateExampleUrl(event.target.value)}} />
</label>
<label> Add an image URL:
   <input id="imgUrl" onChange={(event)=>{setDateExampleImg(event.target.value)}}/> 
</label> <br/>
<button type="submit"> Submit </button>
</form>) 
    
    return(
    <>
        <div className="options"> 
            <h2> Add more date ideas! </h2>
            <button onClick={() => {setDisplayedForm("dateListForm")}}> Add a date idea </button>
            <button onClick={() => {setDisplayedForm("dateExampleForm")}}> Add a date example </button> 
            <button> Add a city </button> 
        </div>  
        {displayedForm === "dateListForm" && dateListForm}
        {displayedForm === "dateExampleForm" && dateExampleForm}
        {message}
    </>
    )
}

export default Contribute; 