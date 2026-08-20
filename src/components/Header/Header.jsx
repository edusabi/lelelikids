import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const categorias = [
    {
      nome: "Conjunto de Alfaiataria",
      url: "/categoria/conjuntoAlfaiataria",
    },
    {
      nome: "Conjunto Jeans",
      url: "/categoria/conjuntoJeans",
    },
    {
      nome: "Calça de Alfaiataria",
      url: "/categoria/calcaAlfaiataria",
    },
    {
      nome: "Conjunto Juvenil",
      url: "/categoria/conjuntoJuvenil",
    },
    {
      nome: "Vestido Cotton",
      url: "/categoria/vestidoCotton",
    },
    {
      nome: "Conjunto FIO 30",
      url: "/categoria/conjuntofio30",
    },
    {
      nome: "Conjunto Infantil Básico",
      url: "/categoria/conjuntoBasico",
    },
    {
      nome: "Conjunto Tecido",
      url: "/categoria/conjuntoTecido",
    },
  ];

  const vendedorUrl =
    "https://wa.me/5581996530929?text=Olá!%20Conheci%20a%20Leleli%20Kids%20pelo%20site%20e%20quero%20conhecer%20o%20catálogo.";

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.headerContent}>
          {/* LOGO */}
          <a
            href="/"
            className={styles.logoContainer}
            onClick={fecharMenu}
            aria-label="Ir para o início"
          >
            <img
              src="/logo.jpg"
              alt="Logo Leleli Kids"
              className={styles.logo}
            />

            <div className={styles.brand}>
              <strong>Leleli Kids</strong>
              <span>Moda infantil</span>
            </div>
          </a>

          {/* NAVEGAÇÃO DESKTOP */}
          <nav
            className={`${styles.nav} ${
              menuAberto ? styles.navAberta : ""
            }`}
          >
            <a href="/" onClick={fecharMenu}>
              Início
            </a>

            <a href="/#vantagens" onClick={fecharMenu}>
              Vantagens
            </a>

            <a
              href="https://www.instagram.com/leleli.kids"
              target="_blank"
              rel="noreferrer"
              onClick={fecharMenu}
            >
              Instagram
            </a>

            <a
              href={vendedorUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.sellerButton}
              onClick={fecharMenu}
            >
              Falar com a vendedora
            </a>
          </nav>

          {/* BOTÃO MOBILE */}
          <button
            type="button"
            className={`${styles.menuButton} ${
              menuAberto ? styles.menuButtonAberto : ""
            }`}
            onClick={() => setMenuAberto((estadoAtual) => !estadoAtual)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* CATEGORIAS ANIMADAS */}
      <div className={styles.tickerContainer}>
        <div className={styles.tickerTrack}>
          {[0, 1].map((grupo) => (
            <div className={styles.tickerGroup} key={grupo}>
              {categorias.map((categoria) => (
                <a
                  key={`${grupo}-${categoria.url}`}
                  href={categoria.url}
                  className={styles.tickerItem}
                  title={`Ver ${categoria.nome}`}
                >
                  <span>♡</span>
                  {categoria.nome}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;