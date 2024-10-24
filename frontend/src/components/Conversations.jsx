import {
    Avatar,
    AvatarBadge,
    Flex,
    Image,
    Stack,
    Text,
    WrapItem,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

const Conversations = ({ conversation }) => {
    const user = conversation.participants[0];
    const currentUser = useRecoilValue(userAtom);
    const lastMessage = conversation.lastMessage;
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
    const { colorMode } = useColorMode(); 
    const hoverBg = useColorModeValue("gray.600", "gray.dark");
    const selectedBg = useColorModeValue("gray.400", "gray.dark");

    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={"1"}
            _hover={{
                cursor: "pointer",
                bg: hoverBg,
                color: "white"
            }}
            onClick={() => setSelectedConversation({
                _id: conversation._id,
                userId: user._id,
                userProfilePic: user.profilePic,
                username: user.username,
                mock: conversation.mock,

            })}
            bg={selectedConversation?._id === conversation._id ? selectedBg : ""}
            borderRadius={"md"}
        >
            <WrapItem>
                <Avatar
                    size={{
                        base: "xs",
                        sm: "sm",
                        md: "md"
                    }}
                    src={user.profilePicture}
                >
                    <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
            </WrapItem>
            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight="700" display={"flex"} alignItems={"center"}>
                    {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    {currentUser._id === lastMessage.sender ? <BsCheck2All size={16} /> : ""}
                    {lastMessage.text.length > 18 ? lastMessage.text.substring(0, 18) + "..." : lastMessage.text}
                </Text>
            </Stack>
        </Flex>
    );
};

export default Conversations;
