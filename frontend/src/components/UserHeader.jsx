import { Box, Flex, Link, Text, VStack } from '@chakra-ui/layout';
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';

const UserHeader = ({ user }) => {
    const showToast = useShowToast();
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom); // this is a user that is logged in 
    const [following , setFollowing] = useState(user.followers.includes(currentUser._id));

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: "Account Created",
                status: "success",
                description: "Profile link copied",
                duration: 3000,
                isClosable: true,
            })
        })
    }

    const handleFollowUnfollow = async() =>{
try{
   const res  = await fetch(`/api/users/follow/${user._id}` , {
    method: "POST" , 
    headers: {
        "Content-Type" : "application/json",
    }
   })
   const data = await res.json();
   if(data.error){
    showToast("Error" , error , "error");
    return;
   }
   if(following){
    showToast("success" , `Unfollow ${user.name}` , "success");
    user.followers.pop();
   }
   setFollowing(!following);
   console.log(data);
   
}catch(error){
    showToast("Error" , error , "error");
}
    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user.username}</Text>
                        <Text fontSize={{
                            base: "xs",
                            md: "sm",
                            lg: "md"
                        }} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                            threads.next
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePic && (<Avatar
                        name={user.name}
                        src={user.profilePic}
                        size={
                            {
                                base: "md",
                                md: "xl",
                            }
                        }
                    />)}
                    {!user.profilePic && (
                        <Avatar
                            name={user.name}
                            src={"/post1.png"}
                            size={
                                {
                                    base: "md",
                                    md: "xl",
                                }
                            }
                        />)}
                </Box>
            </Flex>
            <Text>{user.bio}</Text>

            {currentUser._id === user._id && (
                <Link as={RouterLink} to='/update'>
                    <Button size={"sm"}>Update Profile</Button>
                </Link>
            )}

{currentUser._id !== user._id && (
                    <Button size={"sm"}onClick={handleFollowUnfollow}>
                {following ? "Unfollow " :"follow"}
                    </Button>
            )}
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.length}</Text>
                    <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>  <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy link</MenuItem></MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={"3"} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb={"3"} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader;