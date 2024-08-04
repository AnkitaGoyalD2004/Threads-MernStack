import { VStack, Box, Flex, Text, Link } from '@chakra-ui/layout'
import { Avatar, Menu, MenuButton, MenuList, Portal , MenuItem } from '@chakra-ui/react'
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";


const UserHeader = () => {

    const copyURL = ()=>{
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            console.log("URL copt to clipboard")
        })
    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Mark Zuckerberg
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>markzuckerberg</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                            threads.next
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name='Mark Zuckerberg'
                        src='/zuck-avatar.png'
                        size={"xl"}
                    />
                </Box>
            </Flex>
            <Text>Co-founder , executive chairman and CEO of Meta Platform.</Text>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3.2k followers</Text>
                    <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"}/>
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                            <CgMoreO size={24} cursor={"pointer"}/>
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>  <MenuItem  bg={"gray.dark"} onClick={copyURL}>Copy link</MenuItem></MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader;