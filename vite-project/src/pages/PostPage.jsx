import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
const PostPage = () => {
  return (
    <>
    <Flex>
    <Flex w={"full"} alignItems={"center"} gap={"3"}>
      <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg"/>
      <Flex>
        <Text fontSize={"sm"} fontWeight = {"bold"}>markzuckerberg</Text>
        <Image src="/verified.png" w={"4"} ml={"4"}/>
      </Flex>
    </Flex>
     <Flex gap={"4"} alignItems={"center"}>
      <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
      <BsThreeDots/>
    </Flex> 
    </Flex>
    <Text my={"3"}>Let's talk about threads</Text>

    <Box position={"relative"} borderRadius={"6"} overflow={"hidden"} border={"1px solid "}
                borderColor={"gray.light"}>
<Image src={"/post1.png"} w={"full"}/>
                </Box>
    </>
  )
}

export default PostPage