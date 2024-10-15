import { Avatar, Flex, Text } from "@chakra-ui/react"

const Message = ({ ownMessage }) => {
    return (
        <>
            {ownMessage ? (
                <Flex gap={2}
                    alignSelf={"flex-end"}
                >
                    <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                       
                    </Text>
                    <Avatar src="" w="7" h={7} />
                </Flex>)
                : (  <Flex gap={2} >
                     <Avatar src="" w="7" h={7} />
                    <Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"} color={"black"}>
                        
                        when an unknown printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries.
                    </Text>
                   
                </Flex>)}

        </>

    )
}

export default Message