import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  // Agora a lista contém o nome e o link da página correspondente
  const categorias = [
    { nome: "Conjunto de Alfaiataria", url: "/categoria/conjuntoAlfaiataria" },
    { nome: "Conjunto Jeans", url: "/categoria/conjuntoJeans" },
    { nome: "Conjunto Calça de Alfaiataria", url: "/categoria/calcaAlfaiataria" },
    { nome: "Calça Jeans", url: "/categoria/calcaJeans" },
    { nome: "Conjunto Juvenil", url: "/categoria/conjuntoJuvenil" },
    { nome: "Vestido Cotton", url: "/categoria/vestidoCotton" },
    { nome: "Conjunto FIO 30", url: "/categoria/conjuntofio30" },
    { nome: "Conjunto Infantil Básico", url: "/categoria/conjuntoBasico" },
    { nome: "Blusa Juvenil", url: "/categoria/blusaJuvenil" },
    { nome: "Bermudas Masculino", url: "/categoria/bermudasMasculino" },
    { nome: "Conjunto Tecido", url: "/categoria/conjuntoTecido" },
  ];

  return (
    <header className={styles.header}>
      {/* Barra superior clássica */}
      <div className={styles.topBar}>
        <div className={styles.logoContainer}>
          <img src="/logo.jpg" alt="Leleli Kids Logo" className={styles.logo} />
          <span className={styles.brandName}>Leleli Kids</span>
        </div>
        <nav className={styles.nav}>
          <a href="/">Início</a>
          <a href="/sobre">Sobre</a>
          <a href="https://wa.me/5581996530929" target="_blank" rel="noreferrer" className={styles.navContact}>
            Falar com Vendedor
          </a>
        </nav>
      </div>

      {/* Letreiro digital animado e CLICÁVEL */}
      <div className={styles.tickerContainer}>
        <div className={styles.tickerTrack}>
          {/* Triplicamos o array para criar um efeito visual de loop infinito suave */}
          {[...categorias, ...categorias, ...categorias].map((categoria, index) => (
            <a 
              key={index} 
              href={categoria.url} 
              className={styles.tickerItem}
              title={`Ver ${categoria.nome}`}
            >
              💗 {categoria.nome}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;