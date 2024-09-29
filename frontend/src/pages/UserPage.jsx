import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const[loading , setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      }finally{
        setLoading(false);
      }
    }

 const getPosts = async 

    getUser();
  }, [username, showToast])

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}></Flex>
    )
  }

  if (!user && !loading) {
    return (
     <h1>User not found</h1>
    )
  }

  return (
    <>
      <UserHeader user={user} />
     
      </>
  )
}

export default UserPage