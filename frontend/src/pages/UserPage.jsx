import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user , setUser] = useState(null);
  const {username} = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async() => {
      try{
       const res  = await fetch(`/api/users/profile/${username}`)
       const data = res.json();
       if(data.error){
        s
       }
      }catch(error){
        console.log(error);
      }
    }
    getUser();
  } , [username])
  return (
    <>
     <UserHeader user={user}/>
     <UserPost likes={1200} replies={481} postImg = "/post1.png" postTitle="Let's talk about threads."/>
     <UserPost likes={1765} replies={541} postImg = "/post2.png" postTitle="Nice tutorial"/>
     <UserPost likes={1890} replies={487} postImg = "/post3.png" postTitle="I love this guy"/>    
     <UserPost likes={1120} replies={787} postTitle="This is my first Thread"/>    
     </>
  )
}

export default UserPage