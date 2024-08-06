import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
     <UserHeader/>
     <UserPost likes={1200} replies={481} postImg = "/post1.png" postTitle="Let's talk about threads."/>
     <UserPost likes={1765} replies={541} postImg = "/post2.png" postTitle="Nice tutorial"/>
     <UserPost likes={1890} replies={487} postImg = "/post3.png" postTitle="I love this guy"/>    
     <UserPost likes={1120} replies={787} postTitle="This is my first Thread"/>    
     </>
  )
}

export default UserPage