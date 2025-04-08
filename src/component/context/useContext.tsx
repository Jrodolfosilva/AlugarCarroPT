"use client"
import  {createContext,  useEffect,  useState} from "react"
import { UserContextType } from "@/utils/types"


export const contextUser = createContext<UserContextType | null>(null)


export const ApiContext =({children}: Readonly<{children: React.ReactNode;}>)=>{
    const [date,setDate] = useState<string>()

    useEffect(()=>{
        const datenow = new Date().toISOString().split("T")[0]
        setDate(datenow)
    },[])


    return(
        <contextUser.Provider value={{date}}>
            {children}
        </contextUser.Provider>
    )
}   


