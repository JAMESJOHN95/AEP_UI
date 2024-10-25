import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ServerUrl } from "../Server";


export const TokenContext = createContext();
export const TokenProvider  = ({ children }) => {
    const [token, setToken] = useState("")
    const fetchToken = async () => {
        try {
            console.log("Inside fetchToken Function");
            const response = await axios.post(`${ServerUrl}/generate-token`);
            console.log(response);
            if (response.data && response.data.token) {
                const Token = response.data.token;
                setToken(Token)
            }
            else {
                console.error("No token received on response");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
useEffect(() => {
    fetchToken();  // Fetch the token initially
  }, []);
  console.log(token);
  

  return(
<TokenContext.Provider value = {{token,setToken}}>
    {children}
</TokenContext.Provider>
  )
}   