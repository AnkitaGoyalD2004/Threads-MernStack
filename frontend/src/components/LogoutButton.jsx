import { Button } from '@chakra-ui/react';
import React from 'react';
import { FiLogOut } from "react-icons/fi";
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';


const LogoutButton = () => {
const setUser = useSetRecoilState(userAtom);
const showToast = useShowToast();
const handleLogout = async() => {
    try{
    //fetch
   const res = await fetch("/api/users/logout" , {
    method: "Post",
    headers: {
        "Content-Type": "application/json",
    }
})
   const data = await res.json();
   console.log(data);
   if(data.error){
   showToast("Error" , data.error , "error");
   return;
   }
   localStorage.removeItem("user-threads");
    setUser(null);
    }catch(error){
        showToast("Error" , error , "error");
    }
}

  return (
    <Button position = {"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick = {handleLogout}>
     <FiLogOut />

    </Button>
  )
}

export default LogoutButton;