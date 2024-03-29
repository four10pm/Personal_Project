import { createContext } from "react";
export const urlContext = createContext("https://datenight-project-web.onrender.com/api")
export const tokenContext = createContext(null);
export const userContext = createContext({name: "Planner"});
export const allDatesContext = createContext([])
export const favoritesContext = createContext([])
export const citiesContext=createContext([])
export const selectedDateContext=createContext(null)
export const searchTermContext=createContext("")
