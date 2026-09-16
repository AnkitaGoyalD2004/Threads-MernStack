import { Box, Container } from '@chakra-ui/react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from "./atoms/userAtom";
import CreatePost from './components/CreatePost';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import { SettingsPage } from './pages/SettingsPage';
import UpdateProfilePages from './pages/UpdateProfilePages';
import UserPage from './pages/UserPage';

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  return (
    <Box position={"relative"} width="full">
      <Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
        <Header />
        <Routes> 
          <Route path='/' element={user ? <HomePage /> : <Navigate to="/auth" />}/>
          <Route path='/auth' element={ !user ? <AuthPage/> : <Navigate to= "/" />} />
          <Route path='/update' element={user ? <UpdateProfilePages /> : <Navigate to='/auth' />} />
          <Route path="/:username" element={user ? (
               <>
               <UserPage />
               <CreatePost/>
               </> 
          ) :(
               <UserPage />
          )
          }/>
          <Route path="/:username/post/:pid" element={<PostPage />}/>
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to={"/auth"} />}/>
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to={"/auth"} />}/>
        </Routes> 
      </Container>
    </Box>
  );
}

export default App;
