import { useState, useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation.jsx'
import Account from './components/account.jsx'
import Homepage from './components/homepage.jsx'
import Contribute from './components/contribute.jsx'
import Fetching from './fetching.js'
import { urlContext, tokenContext, userContext, favoritesContext, citiesContext} from './components/context.jsx'
import './App.css'
import Cities from './components/cities.jsx'

function App() {
  const [user, setUser] = useState({name: "Planner"})
  const [token, setToken] = useState(null)
  const [allDates, setAllDates] = useState([])
  const [cities, setCities] = useState([])
  const [dateTypes, setDateTypes] = useState([])
  const [dateExamples, setDateExamples] = useState([])
  const [favorites, setFavorites] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <>
      <userContext.Provider value={user} >
      <tokenContext.Provider value={token} >
      <favoritesContext.Provider value={favorites} >
      <citiesContext.Provider value={cities} >
      <Fetching setCities={setCities} cities={setCities} dateTypes={dateTypes} setDateTypes={setDateTypes} allDates={allDates} setAllDates={setAllDates} dateExamples={dateExamples} setDateExamples={setDateExamples}  />
          <div className="pageTop">
            <h1> Let's Plan a Date! </h1>
          </div>
          <div className="App">
            <Navigation  />
            <Routes>
              <Route path="/"
                element={<Homepage allDates={allDates} setAlLDates={setAllDates} dateExamples={dateExamples} setDateExamples={setDateExamples} token={token} dateTypes={dateTypes} cities={cities}/>}
              />
              <Route path="/cities" element={<Cities  cities={cities} dateTypes={dateTypes} />} />
              <Route path="/account" element={<Account setFavorites={setFavorites} favorites={favorites} setToken={setToken} cities={cities} user={user} setUser={setUser} />} />
              <Route path="/contribute" element={<Contribute allDates={allDates} cities={cities} setCities={setCities} dateTypes={dateTypes} setDateTypes={setDateTypes} dateExamples={dateExamples} setDateExamples={setDateExamples} />} />
            </Routes>
          </div>
          </citiesContext.Provider>
        </favoritesContext.Provider>
      </tokenContext.Provider>
      </userContext.Provider>
    </>
  )
}

export default App

