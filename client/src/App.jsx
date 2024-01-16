import { useState, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation.jsx'
import Account from './components/account.jsx'
import DateList from './components/homepage.jsx'
import Example from './components/examplepage.jsx'
import { NameContext } from './components/context.jsx'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [token, setToken] = useState(null)
  const myName = useContext(NameContext)

  return (
    <>
      <div className="pageTop" myName={myName}>
        <h1> Let's Plan a Date! </h1>
      </div>
      <div className="App" myName={myName}>
          <Navigation /> 
          <Routes> 
            <Route path="/" 
            element={<DateList selectedDate={selectedDate} setSelectedDate={setSelectedDate} token={token} /> } 
            />
            <Route path ="/account" element={<Account token={token} setToken={setToken} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>}/>
          </Routes>
      </div>
    </>
  )
}

export default App

