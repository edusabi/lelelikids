import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardsConjunto.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const CardsConjunto = () => {
  const categorias = [
    {
        id: 1,
        nome: "Conjunto de Alfaiataria",
        descricao: "Modelos elegantes, modernos e confortáveis.",
        imagem: "/conjuntoAlfaiataria/IMG-20260811-WA0018.jpeg",
        rota: "/categoria/conjuntoAlfaiataria",
        tamanhos: "02 ao 16",
        destaque: "Elegante",
        icone: "🎀",
    },
    {
      id: 2,
      nome: "Conjunto Jeans",
      descricao: "Looks versáteis para diferentes ocasiões.",
      imagem: "/conjuntoJeans/IMG-20260811-WA0009.jpeg",
      rota: "/categoria/conjuntoJeans",
      tamanhos: "02 ao 16",
      destaque: "Versátil",
      icone: "👖",
    },
    {
      id: 3,
      nome: "Calça de Alfaiataria",
      descricao: "Conforto e elegância para montar lindos looks.",
      imagem: "/calcaAlfaiataria/IMG-20260811-WA0007.jpeg",
      rota: "/categoria/calcaAlfaiataria",
      tamanhos: "02 ao 16",
      destaque: "Confortável",
      icone: "✨",
    },
    {
      id: 4,
      nome: "Conjunto Juvenil",
      descricao: "Modelos modernos para meninas cheias de estilo.",
      imagem: "/conjuntoJuvenil/IMG-20260811-WA0112.jpeg",
      rota: "/categoria/conjuntoJuvenil",
      tamanhos: "Juvenil",
      destaque: "Moderno",
      icone: "💖",
    },
    {
      id: 5,
      nome: "Vestido Cotton",
      descricao: "Vestidos leves, delicados e confortáveis.",
      imagem: "/vestidoCotton/IMG-20260811-WA0043.jpeg",
      rota: "/categoria/vestidoCotton",
      tamanhos: "02 ao 16",
      destaque: "Delicado",
      icone: "👗",
    },
    {
      id: 6,
      nome: "Conjunto FIO 30",
      descricao: "Conjuntos macios e ideais para o dia a dia.",
      imagem: "/conjuntoFio30/IMG-20260811-WA0051.jpeg",
      rota: "/categoria/conjuntofio30",
      tamanhos: "02 ao 16",
      destaque: "Leve",
      icone: "🌸",
    },
    {
      id: 7,
      nome: "Conjunto Infantil Básico",
      descricao: "Peças essenciais com conforto e praticidade.",
      imagem: "/conjuntoBasico/IMG-20260811-WA0025.jpeg",
      rota: "/categoria/conjuntoBasico",
      tamanhos: "02 ao 16",
      destaque: "Essencial",
      icone: "🧸",
    },
    {
      id: 8,
      nome: "Conjunto de Tecido",
      descricao: "Modelos diferenciados com acabamento especial.",
      imagem: "/conjuntoTecido/IMG-20260811-WA0052.jpeg",
      rota: "/categoria/conjuntoTecido",
      tamanhos: "02 ao 16",
      destaque: "Especial",
      icone: "🦋",
    },
  ];

  const usarLogoComoImagem = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = "/logo.jpg";
  };

  return (
    <div className={styles.wrapper}>
      <Header />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroDecoration}></div>

          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              COLEÇÕES LELELI KIDS
            </span>

            <h1>
              Escolha a categoria que você deseja
            </h1>

            <p>
              Navegue pelas nossas coleções e encontre os melhores modelos
              de moda feminina infantil para sua loja.
            </p>
          </div>
        </section>

        <section className={styles.categoriesSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span>NOSSAS CATEGORIAS</span>
              <h2>Encontre o look perfeito</h2>
            </div>

            <p>
              Clique em uma categoria para conferir os modelos, tamanhos,
              cores e valores disponíveis.
            </p>
          </div>

          <div className={styles.cardsGrid}>
            {categorias.map((categoria) => (
              <Link
                to={categoria.rota}
                className={styles.card}
                key={categoria.id}
                aria-label={`Ver categoria ${categoria.nome}`}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={categoria.imagem}
                    alt={categoria.nome}
                    className={styles.cardImage}
                    onError={usarLogoComoImagem}
                  />

                  <span className={styles.tag}>
                    {categoria.destaque}
                  </span>

                  <span className={styles.cardIcon}>
                    {categoria.icone}
                  </span>

                  <div className={styles.imageOverlay}></div>
                </div>

                <div className={styles.cardContent}>
                  <span className={styles.size}>
                    Tamanhos: {categoria.tamanhos}
                  </span>

                  <h2>{categoria.nome}</h2>

                  <p>{categoria.descricao}</p>

                  <div className={styles.cardFooter}>
                    <span>Ver modelos</span>
                    <span className={styles.arrow}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.helpSection}>
          <div className={styles.helpContent}>
            <div>
              <span>PRECISA DE AJUDA?</span>
              <h2>Não sabe qual modelo escolher?</h2>

              <p>
                Fale com nossa vendedora e receba ajuda para montar seu
                pedido no atacado.
              </p>
            </div>

            <a
              href={`https://wa.me/5581996530929?text=${encodeURIComponent(
                "Olá! Vim pelo site da Leleli Kids e preciso de ajuda para escolher os modelos do meu pedido."
              )}`}
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappButton}
            >
              Falar com a vendedora
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CardsConjunto;