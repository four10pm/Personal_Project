import React, { useEffect, useContext, useState } from 'react'
import { NameContext } from './context'

function DateList () {
    const APIurl = 'http://localhost:8080/api'
    const [dateList, setDateList] = useState([]);

    useEffect(() => {
        async function getDateList() {
            try {
                const response = await fetch(`${APIurl}/dateList`)
                const data = await response.json();
                setDateList(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getDateList();
    }, [])
    console.log(dateList)
    
    return <>
        {dateList.length >0 && <p> Date! </p>}
        {dateList.length === 0 && <p> No date! </p> }

     </> 
}

export default DateList; 
