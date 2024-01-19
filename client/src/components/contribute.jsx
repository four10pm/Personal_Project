import React, { useEffect, useState, useContext } from 'react'
import { urlContext } from './context'
import '../styles/contribute.css'

function Contribute() {
    const apiURL = useContext(urlContext)
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

    const [cityName, setCityName] = useState("")
    const [cityState, setCityState] = useState("")

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
            const result = await response.json()
            setMessage("Thank you for your contribution!")
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
            const result = await response.json()
            setMessage("Thank you for your contribution!")
        }
        catch (error) {
            setMessage(error.message)
        }
    }

    const postCity = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${apiURL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: cityName,
                    state: cityState
                })
            })
            const result = await response.json()
            setMessage("Thank you for your contribution!")
        }
        catch (error) {
            setMessage(error.message)
        }
    }

    const dateListForm =
        (
            <form name="contributeDateList" className="contributeform" onSubmit={postDateList}>
                <label> What would you call this date?
                    <input id="name" placeholder="name your date!" onChange={(event) => { setDateListName(event.target.value) }} />
                </label> <br />
                <label> Is this an at home date?
                    <input id="atHome" type="checkbox" onChange={(event) => { setAtHome(true) }} />
                </label> <br />
                <label> What kind of date is it?
                    <input id="type" onChange={(event) => { setDateListType(event.target.value) }} />
                </label> <br />
                <label> How much does it cost?
                    <input id="price" placeholder="free-$$$$" onChange={(event) => { setDateListPrice(event.target.value) }} />
                </label> <br />
                <label> Tell us about your date:
                    <input id="description" type="textbox" onChange={(event) => { setDateListDescription(event.target.value) }} />
                </label> <br />
                <label> Add an image URL:
                    <input id="imgUrl" onChange={(event) => { setDateListImg(event.target.value) }} />
                </label> <br />
                <button type="submit"> Submit </button>
                {message && <p> {message} </p>}
            </form>)

    const dateExampleForm =
        (
            <form name="contributeDateList" className="contributeform" onSubmit={postDateExample}>
                <label> What would you call this date?
                    <input id="name" placeholder="name your date!" onChange={(event) => { setDateExampleName(event.target.value) }} />
                </label> <br />
                <label> What's the address?
                    <input id="address" onChange={(event) => { setDateExampleAddress(event.target.value) }} />
                </label> <br />
                <label> Which city is it in?
                    <input id="city" type="integer" onChange={(event) => { setDateExampleCity(event.target.value) }} />
                </label> <br />
                <label> What kind of date is it?
                    <input id="type" onChange={(event) => { setDateExampleType(event.target.value) }} />
                </label> <br />
                <label> How much does it cost?
                    <input id="price" placeholder="free-$$$$" onChange={(event) => { setDateExamplePrice(event.target.value) }} />
                </label> <br />
                <label> Tell us about your date:
                    <input id="description" type="textbox" onChange={(event) => { setDateExampleDescription(event.target.value) }} />
                </label> <br />
                <label> Link to the website:
                    <input id="url" onChange={(event) => { setDateExampleUrl(event.target.value) }} />
                </label> <br />
                <label> Add an image URL:
                    <input id="imgUrl" onChange={(event) => { setDateExampleImg(event.target.value) }} />
                </label> <br />
                <button type="submit"> Submit </button>
                {message && <p> {message} </p>}
            </form>)

    const cityForm = (
        <form name="contributeCity" className="contributeform" onSubmit={postCity}>
            <label> What is the name of the city?
                <input id="city" onChange={(event) => { setCityName(event.target.value) }} />
            </label><br />
            <label> What state is the city in?
                <input id="state" onChange={(event) => { setCityState(event.target.value) }} />
            </label> <br />
            <button type="submit"> Submit </button>
            {message && <p> {message} </p>}
        </form>
    )

    return (
        <div className="contributions">
            <div className="options">
                <div>
                    <h2> Add more date ideas! </h2>
                    <button onClick={() => { setDisplayedForm("dateListForm") }}> Add a date idea </button>
                    <button onClick={() => { setDisplayedForm("dateExampleForm") }}> Add a date example </button>
                    <button onClick={() => { setDisplayedForm("cityForm") }}> Add a city </button>
                </div>
                <div>
                    <h2> Edit something </h2>
                    <button> Edit a date idea </button>
                    <button> Edit a date example </button>
                    <button> Edit a city </button>
                </div>
                <div>
                    <h2> Delete something </h2>
                    <button> Delete a date idea </button>
                    <button> Delete a date example </button>
                    <button> Delete a city </button>
                </div>
            </div>
            <div className="forms">
                {displayedForm === "dateListForm" && dateListForm}
                {displayedForm === "dateExampleForm" && dateExampleForm}
                {displayedForm === "cityForm" && cityForm}
            </div>
        </div>

    )
}

export default Contribute; 