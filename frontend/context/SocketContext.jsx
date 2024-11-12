import { createContext, useEffect, useState } from "react";
const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    const [socket , setSocket] = useState(null);

    useEffect(() => {
        const socket = io("http://localhost:4500" , {
            query:{
                userId: user?._id
            }
        });
        setSocket(socket);

        return() => socket && socket.close();
    } , [socket , user?._id])
    return (
        <SocketContext.Provider value={"hi"}>
            {children}
        </SocketContext.Provider>
    )
}