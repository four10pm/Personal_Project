import React, { useContext, useEffect, useState } from "react";
import { urlContext, tokenContext, userContext } from "./components/context";

export default function Fetching({ setAllDates, cities, setCities, dateExamples, setDateExamples, dateTypes, setDateTypes, cityDates, setCityDates, favorites }) {
    const APIurl = useContext(urlContext)
    const myToken = useContext(tokenContext)
    const userInfo = useContext(userContext)

    useEffect(() => {
        async function getAllDates() {
            try {
                const response = await fetch(`${APIurl}/dateList`)
                const data = await response.json();
                setAllDates(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getAllDates();
    }, [])

    useEffect(() => {
        async function getDateExamples() {
            try {
                const response = await fetch(`${APIurl}/dateExamples/`)
                const data = await response.json();
                setDateExamples(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getDateExamples();
    }, [])

    useEffect(() => {
        async function getAllCities() {
            try {
                const response = await fetch(`${APIurl}/cities`)
                const data = await response.json();
                setCities(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getAllCities();
    }, [])

    useEffect(() => {
        async function getDateTypes() {
            try {
                const response = await fetch(`${APIurl}/dateList/types`)
                const data = await response.json();
                setDateTypes(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getDateTypes();
    }, [])

}

export const updateBeenThere = async (event) => {
    event.preventDefault()
    console.log(exampletoUpdate)
    console.log(updateCheck)
    try {
        const response = await fetch(`${APIurl}/dateExamples/${exampletoUpdate}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                beenThere: updateCheck,
            }),
        })
        const result = await response.json
        setMessage("Updated!")
    } catch (error) {
        setMessage(error.message)
    }
}

export const sanitize = () => {
    allDates.map((date) => {
        if (date.lastDone) {
            const d = new Date(date.lastDone)
            date.newDoneDate = d.toDateString()
            return date;
        }
    })
    return
}

export const getCityById = async () => {
    const [myCity, setMyCity] = useState({})
    if (myCity.name) { return myCity }
    console.log(userInfo.city)
    try {
        const response = await fetch(`${APIurl}/cities/${userInfo.city}`)
        const data = await response.json();
        console.log(data)
        setMyCity(data)
        return data;
    } catch (error) {
        console.log(error.message)
    }
}

export const changeCity = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`${APIurl}/users/${userInfo.userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                city: newCityId,
            }),
        })
        const result = await response.json()
        setMessage("Your city has been changed! Please log out to see updates")
        return result;
    } catch (error) {
        console.log("change City", error, error.message)
    }
}

export const addFavorites = async (id, userInfo, APIurl, setMessage) => {
    try {
        const response = await fetch(`${APIurl}/users/${userInfo.userId}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userInfo.userId,
                dateId: id
            })
        })
        const result = await response.json()
        setMessage("Added to favorites!")
    }
    catch (error) {
        console.log(error.message)
        setMessage(error.message)
    }
}

export const deleteFavorites = async (id, userInfo, APIurl, setMessage) => {
    try {
        const response = await fetch(`${APIurl}/users/${userInfo.userId}/favorites/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userInfo.userId,
                dateId: id
            })
        });
        setMessage("Removed from favorites!")
    } catch (error) {
        console.log(error.message)
        setMessage(error.message)
    }
}