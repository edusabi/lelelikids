import React from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { NavLink } from "react-router-dom";

const Home = () => {
  const mensagemVendedor =
    "Olá! Vim pelo site da Leleli Kids, gostei dos produtos e quero fazer um pedido no atacado. Pode me atender?";

  const vendedorUrl = `https://wa.me/5581996530929?text=${encodeURIComponent(
    mensagemVendedor
  )}`;

  const grupoUrl =
    "https://chat.whatsapp.com/GnYY2piP5dP9nLWOf7Gn56?s=cl&p=a&ilr=4";

  const instaUrl =
    "https://www.instagram.com/leleli.kids?igsh=MTd5c25yb2duN2FpaA==";

  return (
    <div className={styles.wrapper}>
      <Header />

      <main>
        {/* HERO */}
        <section className={styles.hero} id="inicio">
          <div className={styles.heroDecoration}></div>

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <span className={styles.eyebrow}>
                MODA INFANTIL NO ATACADO
              </span>

              <h1>
                Looks encantadores para{" "}
                <span>momentos inesquecíveis</span>
              </h1>

              <p>
                Moda feminina infantil com qualidade, conforto e modelos que
                encantam. Encontre peças do <strong>tamanho 02 ao 16</strong>{" "}
                diretamente da fábrica.
              </p>

              <div className={styles.heroButtons}>
                <NavLink
                  to="/cardsConjunto"
                  className={styles.primaryButton}
                >
                  Fazer pedido no atacado
                </NavLink>

                <a
                  href={grupoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.secondaryButton}
                >
                  Entrar no grupo de atacado
                </a>
              </div>

              <div className={styles.heroBenefits}>
                <div>
                  <strong>02 ao 16</strong>
                  <span>Variedade de tamanhos</span>
                </div>

                <div>
                  <strong>Direto da fábrica</strong>
                  <span>Condições especiais</span>
                </div>

                <div>
                  <strong>Envios</strong>
                  <span>Para todo o Brasil</span>
                </div>
              </div>
            </div>

            <div className={styles.heroImageContainer}>
              <div className={styles.imageBackground}></div>

              <div className={styles.imageCard}>
                <img
                  src="/logo.jpg"
                  alt="Leleli Kids Moda Infantil"
                />

                <div className={styles.imageBadge}>
                  <span>✨</span>

                  <div>
                    <strong>Novidades toda semana</strong>
                    <p>Acompanhe nossos lançamentos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className={styles.features} id="vantagens">
          <div className={styles.sectionHeader}>
            <span>POR QUE ESCOLHER A LELELI?</span>

            <h2>Feito com carinho em cada detalhe</h2>

            <p>
              Peças pensadas para lojistas que procuram beleza, qualidade e
              variedade.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <article className={styles.featureCard}>
              <div className={styles.featureIcon}>🏭</div>

              <h3>Direto da fábrica</h3>

              <p>
                Compre diretamente de quem produz e aproveite condições
                especiais para atacado.
              </p>
            </article>

            <article className={styles.featureCard}>
              <div className={styles.featureIcon}>📦</div>

              <h3>Envios com segurança</h3>

              <p>
                Seu pedido é preparado com cuidado para chegar organizado e
                protegido.
              </p>
            </article>

            <article className={styles.featureCard}>
              <div className={styles.featureIcon}>👗</div>

              <h3>Tamanhos do 02 ao 16</h3>

              <p>
                Modelos para diferentes idades, estilos e momentos especiais.
              </p>
            </article>

            <article className={styles.featureCard}>
              <div className={styles.featureIcon}>💖</div>

              <h3>Modelos encantadores</h3>

              <p>
                Coleções modernas, confortáveis e produzidas para conquistar
                suas clientes.
              </p>
            </article>
          </div>
        </section>

        {/* ATACADO */}
        <section className={styles.wholesale}>
          <div className={styles.wholesaleContent}>
            <div className={styles.wholesaleText}>
              <span>CONDIÇÕES ESPECIAIS</span>

              <h2>Quer comprar no atacado?</h2>

              <p>
                Entre para o nosso grupo exclusivo e receba novidades,
                lançamentos, modelos disponíveis e condições especiais para
                lojistas.
              </p>
            </div>

            <div className={styles.wholesaleButtons}>
              <a
                href={grupoUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.whiteButton}
              >
                Entrar no grupo
              </a>

              <a
                href={vendedorUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.outlineButton}
              >
                Fazer meu pedido
              </a>
            </div>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className={styles.instagram}>
          <div className={styles.instagramContent}>
            <span className={styles.instagramIcon}>♡</span>

            <div>
              <span>ACOMPANHE AS NOVIDADES</span>

              <h2>Siga a Leleli Kids no Instagram</h2>

              <p>
                Veja nossos lançamentos, modelos disponíveis e inspirações de
                looks infantis.
              </p>
            </div>

            <a
              href={instaUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.instagramButton}
            >
              @leleli.kids
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;