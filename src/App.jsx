import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import LinkBio from "./pages/LinkBio/LinkBio";

function App() {

  return (
    <>
    <BrowserRouter>
    
      <Routes>

        <Route path="/linkbio" element={<LinkBio/>}/>

      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
