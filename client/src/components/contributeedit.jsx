// Decided not to use this for now

import React, { useState, useContext, useEffect } from "react"
import { urlContext } from "./context";

export default function ContributeEdit({ displayedForm, allDates, dateExamples, cities, message, setMessage }) {
    return (
        <>
            {displayedForm === "editDateListForm" && <EditDateListForm allDates={allDates} message={message} setMessage={setMessage} />}
            {displayedForm === "editDateExampleForm" && <EditDateExampleForm dateExamples={dateExamples} cities={cities} allDates={allDates} message={message} setMessage={setMessage} />}
            {displayedForm === "editCityForm" && <EditCityForm cities={cities} message={message} setMessage={setMessage} />}
        </>
    )
}

function EditDateListForm({ allDates, message, setMessage }) {
    const APIurl = useContext(urlContext)
    const [datetoEdit, setDatetoEdit] = useState(null)

    return (
        <form name="editDateList" className="contributeform" onSubmit={editDateList}>
            <label> Which date would you like to edit?
                <select required name="editDate" onChange={(e) => { setDatetoEdit(e.target.value) }}>
                    <option value={""}> Select </option>
                    {allDates.map((date) => {
                        return (
                            <option value={date.dateId}> {date.name} </option>
                        )
                    })}
                </select>
            </label> <br />
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
}

function EditDateExampleForm({ dateExamples, cities, allDates, message, setMessage }) {
    const APIurl = useContext(urlContext)
    const [exampleIdtoEdit, setExampleIdtoEdit] = useState(null)
    const [dateExample, setDateExample] = useState({})
    const [dateExampleName, setDateExampleName] = useState("")
    const [dateExamplePrice, setDateExamplePrice] = useState("")
    const [dateExampleDescription, setDateExampleDescription] = useState("")
    const [dateExampleUrl, setDateExampleUrl] = useState("")
    const [dateExampleImg, setDateExampleImg] = useState("")
    const [dateExampleAddress, setDateExampleAddress] = useState("")
    const [dateExampleCity, setDateExampleCity] = useState(null)
    const [dateExampleType, setDateExampleType] = useState(null)
    const [editFormDisplay, setEditFormDisplay] = useState(false)

    const editDateExample = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${APIurl}/dateExamples/${exampleIdtoEdit}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: dateExample.name,
                    address: dateExample.address,
                    price: dateExample.price,
                    description: dateExample.description,
                    url: dateExample.url,
                    imgUrl: dateExample.imgUrl,
                    city: dateExample.city,
                    dateId: dateExample.type
                }),
            })
            const result = await response.json
            setMessage("This date has been edited!")
        } catch (error) {
            setMessage(error.message)
        }
    }

    function filterExamples(e) {
        e.preventDefault()
        const ex = dateExamples.find((example) => {
            return example.exampleId === parseInt(exampleIdtoEdit)
        })
        console.log(ex)
        setDateExample(ex)
        setEditFormDisplay(true)
        return ex;
    }
    console.log(dateExample.city)

    const editExampleForm =
        (
            <form name="editExampleForm" onSubmit={(event) => { editDateExample(event) }}>
                <label> Edit the name:
                    <input id="name" defaultValue={dateExample.name} placeholder={dateExample.name} onChange={(event) => { setDateExample.name(event.target.value) }} />
                </label> <br />
                <label> Edit the address:
                    <input id="address" defaultValue={dateExample.address} placeholder={dateExample.address} onChange={(event) => { setDateExample(dateExample.address === event.target.value) }} />
                </label> <br />
                <label> Edit the city:
                    <select name="cityFilter" defaultValue={dateExample.city} onChange={(e) => { setDateExample(dateExample.city === e.target.value) }}>
                        <option value={""}> Select </option>
                        {cities.map((city) => {
                            return (
                                <option value={city.cityId}> {city.name}, {city.state} </option>
                            )
                        })}
                    </select>
                </label> <br />
                <label> Edit the date type:
                    <select name="typeFilter" defaultValue={dateExample.dateId} onChange={(e) => { setDateExample.type(e.target.value) }}>
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
                <label> Edit the date price:
                    <input id="price" placeholder={dateExample.price} defaultValue={dateExample.price} onChange={(event) => { setDateExample.price(event.target.value) }} />
                </label> <br />
                <label> Edit the date description:
                    <input id="description" type="textbox" placeholder={dateExample.description} defaultValue={dateExample.description} onChange={(event) => { setDateExample.description(event.target.value) }} />
                </label> <br />
                <label> Edit the website link:
                    <input id="url" placeholder={dateExample.url} defaultValue={dateExample.url} onChange={(event) => { setDateExample.url(event.target.value) }} />
                </label> <br />
                <label> Edit the image URL:
                    <input id="imgUrl" placeholder={dateExample.imgUrl} defaultValue={dateExample.url} onChange={(event) => { setDateExample.imgUrl(event.target.value) }} />
                </label> <br />
                <button type="submit" > Submit</button>
            </form>
        )


    return (
        <>
            <form name="chooseDateExample" className="contributeform" onSubmit={(e) => { filterExamples(e); console.log(exampleIdtoEdit) }}>
                <label> Which date would you like to edit?
                    <select required name="editDateExample" onChange={(e) => { setExampleIdtoEdit(e.target.value) }}>
                        <option value={""}> Select </option>
                        {dateExamples.map((example) => {
                            return (
                                <option value={example.exampleId}> {example.name} </option>
                            )
                        })}
                    </select>
                </label> <br />
                <button type="submit"> Submit </button>
            </form>
            {setEditFormDisplay && editExampleForm}
        </>
    )
}

function EditCityForm({ cities, message, setMessage }) {
    const APIurl = useContext(urlContext)
    const [cityIDtoEdit, setCityIDtoEdit] = useState(null)
    const [citytoEdit, setCitytoEdit] = useState({})

    const [editFormDisplay, setEditFormDisplay] = useState(false)


    const editCity = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${APIurl}/dateExamples/${citytoEdit}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: citytoEdit.name,
                    state: citytoEdit.state,
                }),
            })
            const result = await response.json
            setMessage("This city has been edited!")
        } catch (error) {
            setMessage(error.message)
        }
    }

    function cityInfo(e) {
        e.preventDefault()
        const ex = cities.find((city) => {
            return city.cityId === parseInt(citytoEdit)
        })
        console.log(ex)
        setCitytoEdit(ex)
        setEditFormDisplay(true)
        return ex;
    }
    console.log(cityIDtoEdit)
    console.log(citytoEdit)

    const editCityForm =
        (
            <form name="editCity" className="contributeform" onSubmit={(event) => { editCity(event) }}>
                <label> Edit the city name:
                    <input id="name" placeholder={citytoEdit.name} defaultValue={citytoEdit.name} onChange={(e) => { setCitytoEdit(e.target.value) }} />
                </label> <br />
                <label> Edit the state:
                    <input id="state" placeholder={citytoEdit.state} defaultValue={citytoEdit.state} onChange={(e) => { setCitytoEdit(e.target.value) }} />
                </label> <br />
                <button type="submit"> Submit </button>
                {console.log(citytoEdit)}
            </form>
        )

    return (
        <form name="chooseCity" className="contributeform" onSubmit={(event) => { cityInfo(event) }}>
            <label> Which city would you like to edit?
                <select required name="editCity" onChange={(e) => { setCitytoEdit(e.target.value) }}>
                    <option value={""}> Select </option>
                    {cities.map((city) => {
                        return (
                            <option value={city.cityId}> {city.name}, {city.state} </option>
                        )
                    })}
                </select>
            </label> <br />
            <button type="submit"> Submit </button>
            {setEditFormDisplay && editCityForm}
        </form>

    )
}