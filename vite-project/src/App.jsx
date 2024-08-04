import {Button} from '@chakra-ui/button'
import {Container} from '@chakra-ui/react'
function App() {
  return (
    <Container maxW="620px">
      <Routes>
        <Route path="/:username" element={<userPage />}/>
      </Routes>
    </Container>
  )
}

export default App;
