// import { Flex, Spinner } from '@chakra-ui/react';
// import { useEffect, useState } from 'react';
// import { useRecoilState } from 'recoil';
// import postsAtom from '../atoms/postsAtom';
// import Post from "../components/Post";
// import useShowToast from '../hooks/useShowToast';
// const HomePage = () => {

//     const [posts, setPosts] = useRecoilState(postsAtom);
//     const [loading, setLoading] = useState(true);
//     const showToast = useShowToast();

//     useEffect(() => {
//         const getFeedPosts = async () => {
//             setLoading(true);
//             setPosts([]);
//             try {
//                 const res = await fetch("/api/posts/feed");
//                 const data = await res.json();
//                 if (data.error) {
//                     showToast("Error", data.error, "error");
//                     return;
//                 }
//                 console.log(data);
//                 setPosts(data);
//             } catch (error) {
//                 showToast("Error", error.message, "error");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         getFeedPosts();
//     }, [showToast , setPosts])
//     return (
//         <>

//             {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

//             {loading && (
//                 <Flex justify="center">
//                     <Spinner size="xl" />
//                 </Flex>
//             )}

//             {posts.map((post) => (
//                 <Post key={post._id} post={post} postedBy={post.postedBy} />
//             ))}
//         </>
//     )
// }

// export default HomePage;

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import Post from "../components/Post";
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
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

        setPosts(data); // Set posts only if response is an array
      } catch (error) {
        showToast("Error", error?.message || "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )}

        {loading && (
          <Flex justify="center">
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
        {/* Add content here */}
      </Box>
    </Flex>
  );
};

export default HomePage;
