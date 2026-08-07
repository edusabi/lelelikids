import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import LinkBio from "./pages/LinkBio/LinkBio";
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";

// Roupas/conjuntos
import ConjuntoAlfaiataria from "./pages/ConjuntoAlfaiataria/ConjuntoAlfaiataria";
import ConjuntoJeans from "./pages/ConjuntoJeans/ConjuntoJeans";
import CalcaAlfaiataria from "./pages/CalcaAlfaiataria/CalcaAlfaiataria";
import CalcaJeans from "./pages/CalcaJeans/CalcaJeans";
import ConjuntoJuvenil from "./pages/ConjuntoJuvenil/ConjuntoJuvenil";
import VestidoCotton from "./pages/VestidoCotton/VestidoCotton"
import Conjuntofio30 from "./pages/Conjuntofio30/Conjuntofio30"
import ConjuntoBasico from "./pages/ConjuntoBasico/ConjuntoBasico"
import BlusaJuvenil from "./pages/BlusaJuvenil/BlusaJuvenil"
import BermudasMasculino from "./pages/BermudasMasculino/BermudasMasculino"
import ConjuntoTecido from "./pages/ConjuntoTecido/ConjuntoTecido"

function App() {

  return (
    <>
    <BrowserRouter>
    
      <Routes>

        <Route path="/linkbio" element={<LinkBio/>}/>

        <Route path="/" element={<Home/>}/>
        <Route path="/sobre" element={<Sobre/>}/>

        {/* ROUPAS/CONJUNTOS */}
        <Route path="/categoria/conjuntoAlfaiataria" element={<ConjuntoAlfaiataria/>}/> 

        <Route path="/categoria/conjuntoJeans" element={<ConjuntoJeans/>}/> 

        <Route path="/categoria/calcaAlfaiataria" element={<CalcaAlfaiataria/>}/> 

        <Route path="/categoria/calcaJeans" element={<CalcaJeans/>}/> 

        <Route path="/categoria/conjuntoJuvenil" element={<ConjuntoJuvenil/>}/> 

        <Route path="/categoria/vestidoCotton" element={<VestidoCotton/>}/> 

        <Route path="/categoria/conjuntofio30" element={<Conjuntofio30/>}/> 

        <Route path="/categoria/conjuntoBasico" element={<ConjuntoBasico/>}/> 

        <Route path="/categoria/blusaJuvenil" element={<BlusaJuvenil/>}/> 

        <Route path="/categoria/bermudasMasculino" element={<BermudasMasculino/>}/> 

        <Route path="/categoria/conjuntoTecido" element={<ConjuntoTecido/>}/> 

      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
