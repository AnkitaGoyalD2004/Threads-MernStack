import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Actions from "./Actions";


const Post = ({post , postedBy}) => {
  const [liked , setLiked] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async() =>{
        try{
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if(data.error){
            showToast("Error" , data.error , "error");
            return;
        }
        }catch(error){
            showToast("Error" , error.message , "error");
        }
    };
    getUser();
  } , [postedBy , showToast]);

  return (
    <Link to={"/markzuckerberg/post/1"}>
        <Flex gap={"3"} mb={"4"} py={"5"}>
              <Flex flexDirection={"column"} alignItems={"center"} >
                <Avatar size={"md"} name='Mark Zuckerberg' src='/zuck-avatar.png' />
                <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                <Box position={"relative"} w={"full"}>
                    <Avatar 
                    size="xs"
                    name='John Doe'
                    src='https://bit.ly/dan-abramov'
                    position={"absolute"}
                    top={"0px"}
                    left={"15px"}
                    padding={"2px"}
                    />
                    <Avatar 
                    size="xs"
                    name='Kent Dodds'
                    src='https://bit.ly/kent-c-dodds'
                    position={"absolute"}
                    bottom={"0px"}
                    right={"-5px"}
                    padding={"2px"}
                    />
                    <Avatar 
                    size="xs"
                    name='Segun Adebayo'
                    src='https://bit.ly/sage-adebayo'
                    position={"absolute"}
                    bottom={"0px"}
                    left={"4px"}
                    padding={"2px"}
                    />
                </Box>
              </Flex>
              <Flex flex={"1"} flexDirection={"column"} gap={"1"}>
                <Flex justifyContent={"space-between"} w={"full"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>Mark Zukerberg</Text>
                        <Image src='/verified.png' w={"4"} h={"4"} ml={"1"} />
                    </Flex>
                    <Flex gap={"4"} alignItems={"center"} >
                        <Text fontStyle={"sm"} color={"gray.light"}>Id</Text>
                    <BsThreeDots/>
                    </Flex>
                </Flex>
                <Text fontStyle={"sm"}>{post.text}</Text>
                
                {post.img &&
                (<Box position={"relative"} borderRadius={"6"} overflow={"hidden"} border={"1px solid "}
                borderColor={"gray.light"}>
<Image src={postImg} w={"full"}/>
                </Box>
)}
                <Flex gap={"3"} my={"1"}><Actions liked={liked} setLiked={setLiked}/></Flex>

              <Flex gap={"2"} alignItems={"center"}>
                <Text color={"gray.light"} fontSize={"sm"}>{post.replies.length}</Text>
                <Box w={"0.5"} h={"0.5"} borderRadius={"full"} bg={"gray.light"}></Box>
                <Text color={"gray.light"} fontSize={"sm"}>{post.likes.length}</Text>
              </Flex>

              </Flex>
        </Flex>

    </Link>
  )
}

export default Post