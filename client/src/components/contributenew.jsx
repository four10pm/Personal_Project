import React, { useState, useContext } from "react"
import { urlContext, userContext, citiesContext } from "./context";

function ContributeNew({ displayedForm, allDates, message, setMessage }) {
    return (
        <>
            {displayedForm === "dateListForm" && <DateListForm message={message} setMessage={setMessage} />}
            {displayedForm === "dateExampleForm" && <DateExampleForm allDates={allDates} message={message} setMessage={setMessage} />}
            {displayedForm === "cityForm" && <CityForm message={message} setMessage={setMessage} />}
        </>
    )
}

export function DateListForm({ message, setMessage }) {
    const [dateListName, setDateListName] = useState("")
    const [atHome, setAtHome] = useState(false)
    const [dateListType, setDateListType] = useState("")
    const [dateListPrice, setDateListPrice] = useState("")
    const [dateListDescription, setDateListDescription] = useState("")
    const [dateListImg, setDateListImg] = useState("")
    const APIurl = useContext(urlContext)

    const postDateList = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${APIurl}/dateList`, {
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
            setMessage("There's been an error! Please try again")
            console.log(error.message)
        }
    }

    return (
        <form name="contributeDateList" className="contributeform addForm" onSubmit={(event) => { postDateList(event) }}>
            <label> What would you call this date? &nbsp;
                <input id="name" placeholder="name your date!" onChange={(event) => { setDateListName(event.target.value) }} />
            </label> <br />
            <label> Is this an at home date? &nbsp;
                <input id="atHome" type="checkbox" onChange={(event) => { setAtHome(true) }} />
            </label> <br />
            <label> What kind of date is it? &nbsp;
                <input id="type" onChange={(event) => { setDateListType(event.target.value) }} />
            </label> <br />
            <label> How much does it cost? &nbsp;
                <input id="price" placeholder="free-$$$$" onChange={(event) => { setDateListPrice(event.target.value) }} />
            </label> <br />
            <label> Tell us about your date: &nbsp;
                <input id="description" type="textbox" onChange={(event) => { setDateListDescription(event.target.value) }} />
            </label> <br />
            <label> Add an image URL: &nbsp;
                <input id="imgUrl" onChange={(event) => { setDateListImg(event.target.value) }} />
            </label> <br />
            <button name="dateListSubmit" type="submit" className="submitButton"> Submit </button>
        </form>)
}

export function DateExampleForm({ allDates, message, setMessage }) {
    const [dateExampleName, setDateExampleName] = useState("")
    const [dateExamplePrice, setDateExamplePrice] = useState("")
    const [dateExampleDescription, setDateExampleDescription] = useState("")
    const [dateExampleUrl, setDateExampleUrl] = useState("")
    const [dateExampleImg, setDateExampleImg] = useState("")
    const [dateExampleAddress, setDateExampleAddress] = useState("")
    const [dateExampleCity, setDateExampleCity] = useState(null)
    const [dateExampleType, setDateExampleType] = useState(null)
    const APIurl = useContext(urlContext)
    const cities = useContext(citiesContext)
    const userInfo = useContext(userContext)
    const myCity = userInfo.city

    const postDateExample = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${APIurl}/dateExamples`, {
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
                    "imgUrl": dateExampleImg,
                    city: dateExampleCity,
                    dateId: dateExampleType
                })
            })
            const result = await response.json()
            setMessage("Thank you for your contribution!")
        }
        catch (error) {
            console.log(error.message)
            setMessage("There's been an error! Please try again")
        }
    }

    return (
        <form name="contributeDateList" className="contributeform addForm" onSubmit={(event) => { postDateExample(event) }}>
            <label> What would you call this date? &nbsp;
                <input id="name" placeholder="name your date!" onChange={(event) => { setDateExampleName(event.target.value) }} />
            </label> <br />
            <label> What's the address? &nbsp;
                <input id="address" onChange={(event) => { setDateExampleAddress(event.target.value) }} />
            </label> <br />
            <label> Which city is it in? &nbsp;
                <select name="cityFilter" defaultValue={myCity} onChange={(e) => { setDateExampleCity(e.target.value) }}>
                    <option value={""}> Select </option>
                    {cities.map((city) => {
                        return (
                            <option value={city.cityId}> {city.name}, {city.state} </option>
                        )
                    })}
                </select>
            </label> <br />
            <label> What kind of date is it? &nbsp;
                <select name="typeFilter" onChange={(e) => { setDateExampleType(e.target.value) }}>
                    <option value={""}> Select </option>
                    {allDates.map((date) => {
                        if (!date.atHome) {
                            return (
                                <option value={date.dateId}> {date.name} </option>
                            )
                        }
                    })}
                </select>
            </label> <br />
            <label> How much does it cost? &nbsp;
                <input id="price" placeholder="free-$$$$" onChange={(event) => { setDateExamplePrice(event.target.value) }} />
            </label> <br />
            <label> Tell us about your date: &nbsp;
                <input id="description" type="textbox" onChange={(event) => { setDateExampleDescription(event.target.value) }} />
            </label> <br />
            <label> Link to the website: &nbsp;
                <input id="url" onChange={(event) => { setDateExampleUrl(event.target.value) }} />
            </label> <br />
            <label> Add an image URL: &nbsp;
                <input id="imgUrl" onChange={(event) => { setDateExampleImg(event.target.value) }} />
            </label> <br />
            <button type="submit" className="submitButton"> Submit </button>
        </form>)
}

export function CityForm({ message, setMessage }) {
    const APIurl = useContext(urlContext)
    const cities = useContext(citiesContext)
    const userInfo = useContext(userContext)
    const myCity = userInfo.city
    const [cityName, setCityName] = useState("")
    const [cityState, setCityState] = useState("")

    const postCity = async (event) => {

        event.preventDefault()
        try {
            const response = await fetch(`${APIurl}/cities`, {
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

    return (
        <form name="contributeCity" className="contributeform addForm" onSubmit={(event) => { postCity(event) }}>
            <label> What is the name of the city? &nbsp;
                <input id="city" onChange={(event) => { setCityName(event.target.value) }} />
            </label><br />
            <label> What state is the city in? &nbsp;
                <input id="state" onChange={(event) => { setCityState(event.target.value) }} />
            </label> <br />
            <button type="submit" className="submitButton"> Submit </button>
        </form>
    )
}


export default ContributeNew; 
