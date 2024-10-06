import { Container } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from "./atoms/userAtom";
import CreatePost from './components/CreatePost';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import UpdateProfilePages from './pages/UpdateProfilePages';
import UserPage from './pages/UserPage';
function App() {
const user = useRecoilValue(userAtom);

  return (
    <Container maxW="620px">
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
      </Routes> 
    </Container>
  )
}

export default App;
