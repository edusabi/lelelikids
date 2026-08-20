import {BrowserRouter, Routes, Route} from "react-router-dom";

//pages
import LinkBio from "./pages/LinkBio/LinkBio";
import Home from "./pages/Home/Home";
// import Sobre from "./pages/Sobre/Sobre";

// Roupas/conjuntos
import ConjuntoAlfaiataria from "./pages/ConjuntoAlfaiataria/ConjuntoAlfaiataria";
import ConjuntoJeans from "./pages/ConjuntoJeans/ConjuntoJeans";
import CalcaAlfaiataria from "./pages/CalcaAlfaiataria/CalcaAlfaiataria";
import ConjuntoJuvenil from "./pages/ConjuntoJuvenil/ConjuntoJuvenil";
import VestidoCotton from "./pages/VestidoCotton/VestidoCotton"
import Conjuntofio30 from "./pages/Conjuntofio30/Conjuntofio30"
import ConjuntoBasico from "./pages/ConjuntoBasico/ConjuntoBasico"
import ConjuntoTecido from "./pages/ConjuntoTecido/ConjuntoTecido"
import CardsConjunto from "./pages/CardsConjunto/CardsConjunto"

function App() {

  return (
    <>
    <BrowserRouter>
    
      <Routes>

        <Route path="/linkbio" element={<LinkBio/>}/>

        <Route path="/" element={<Home/>}/>
        {/* <Route path="/sobre" element={<Sobre/>}/> */}

        {/* ROUPAS/CONJUNTOS */}
        <Route path="/categoria/conjuntoAlfaiataria" element={<ConjuntoAlfaiataria/>}/> 

        <Route path="/categoria/conjuntoJeans" element={<ConjuntoJeans/>}/> 

        <Route path="/categoria/calcaAlfaiataria" element={<CalcaAlfaiataria/>}/> 


        <Route path="/categoria/conjuntoJuvenil" element={<ConjuntoJuvenil/>}/> 

        <Route path="/cardsConjunto" element={<CardsConjunto/>}/> 

        <Route path="/categoria/vestidoCotton" element={<VestidoCotton/>}/> 

        <Route path="/categoria/conjuntofio30" element={<Conjuntofio30/>}/> 

        <Route path="/categoria/conjuntoBasico" element={<ConjuntoBasico/>}/> 

        <Route path="/categoria/conjuntoTecido" element={<ConjuntoTecido/>}/> 

      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
