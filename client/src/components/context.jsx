import { createContext } from "react";
export const urlContext = createContext("http://localhost:8080/api")
export const nameContext = createContext("Planner"); 
export const tokenContext = createContext(null);
export const cityContext = createContext(null);