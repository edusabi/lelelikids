import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import LinkBio from "./pages/linkBio/linkBio";

function App() {

  return (
    <>
    {/* <h1 style={{textAlign:"center"}}>SITE LELELI KIDS</h1> */}
    <BrowserRouter>
    
      <Routes>

        <Route path="/linkbio" element={<LinkBio/>}/>

      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
