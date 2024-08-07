import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
const Comments = () => {
    const [liked , setLiked] = useState(false);
  return (
   <>
   <Flex gap={"4"} my={'2'} py={"2"} w={"full"}>
    <Avatar src="/zuck-avatar.png" size={"sm"}/>
    <Flex gap={"1"} w={"full"} flexDirection={"column"}>
        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize="sm" fontWeight="bold">Mark</Text>
            <Flex gap={"2"} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.ligth"}>1d</Text>
                <BsThreeDots/>
            </Flex>
        </Flex>
        <Text>Hey this looks great!</Text>
        <Actions liked={liked} setLiked={setLiked} />
    </Flex>
   </Flex>
   </>
  )
}

export default Comments