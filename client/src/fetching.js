import React, {useContext, useEffect, useState} from "react";
import { urlContext } from "./components/context";

export default function Fetching ({allDates, setAllDates, dateExamples, setDateExamples, dateTypes, setDateTypes, cities, setCities, selectedDate, setSelectedDate}) {
const APIurl = useContext(urlContext)

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