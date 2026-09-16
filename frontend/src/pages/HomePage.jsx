import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import Post from "../components/Post";
import SuggestedUsers from "../components/SuggestedUsers";
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  const getFeedPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts/feed");
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (!Array.isArray(data)) {
        showToast("Error", "Unexpected API response format", "error");
        console.error("Unexpected API response:", data);
        return;
      }

      setPosts(data);
    } catch (error) {
      showToast("Error", error?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast, setPosts]);

  useEffect(() => {
    getFeedPosts();
  }, [getFeedPosts]);

  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <Box textAlign={"center"} my={6}>
            <Text fontSize={"lg"} fontWeight={"medium"} mb={6}>
              Follow some users to see their posts in your feed
            </Text>
            {/* Show suggested users inside the main column on mobile when feed is empty */}
            <Box display={{ base: "block", md: "none" }} textAlign={"left"} p={4} borderRadius={"md"} borderWidth={"1px"} borderColor={"gray.dark"}>
              <SuggestedUsers onFollowToggle={getFeedPosts} />
            </Box>
          </Box>
        )}

        {loading && (
          <Flex justify="center" my={12}>
            <Spinner size="xl" />
          </Flex>
        )}

        {Array.isArray(posts) &&
          posts.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))}
      </Box>
      <Box
        flex={30}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <SuggestedUsers onFollowToggle={getFeedPosts} />
      </Box>
    </Flex>
  );
};

export default HomePage;
