import { createContext, useState } from "react";
export const urlContext = createContext(process.env.API_URL || "http://localhost:8080/api")
export const tokenContext = createContext(null);
export const userContext = createContext({name: "Planner"});
export const allDatesContext = createContext([])
export const favoritesContext = createContext([])
export const citiesContext=createContext([])
export const selectedDateContext=createContext(null)
export const searchTermContext=createContext("")
