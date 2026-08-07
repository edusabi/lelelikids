import React from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const vendedorUrl = "https://wa.me/5581996530929";
  const instaUrl = "https://www.instagram.com/leleli.kids?igsh=MTd5c25yb2duN2FpaA==";

  return (
    <div className={styles.wrapper}>
        <Header/>

      <main>
        {/* Seção Principal (Hero) */}
        <section className={styles.hero} id="inicio">
          <div className={styles.heroText}>
            <h1>Moda Feminina Infantil</h1>
            <p>
              Moda infantil feita para deixar cada momento ainda mais especial ✨. 
              Encontre os melhores looks para sua princesa, do <strong>tamanho 02 ao 16</strong>.
            </p>
            <div className={styles.heroButtons}>
              <a href="/categoria/MelhoresPecas" target="_blank" rel="noreferrer" className={styles.primaryButton}>
                Nossas Melhores Peças
              </a>
              <a href="https://chat.whatsapp.com/GnYY2piP5dP9nLWOf7Gn56?s=cl&p=a&ilr=4" target="_blank" rel="noreferrer" className={styles.secondaryButton}>
                Grupo de Atacado
              </a>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={styles.imagePlaceholder}>
              <img src="/logo.jpg" alt="Coleção Leleli Kids" />
            </div>
          </div>
        </section>

        {/* Seção de Diferenciais (Baseado na Bio do Instagram) */}
        <section className={styles.features} id="vantagens">
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🏭</span>
            <h3>Loja de Fábrica</h3>
            <p>Preço justo e qualidade impecável direto de quem produz.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📦</span>
            <h3>Entregas e Envios</h3>
            <p>Enviamos nossos looks com todo o cuidado para você.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>👗</span>
            <h3>Looks do 02 ao 16</h3>
            <p>Acompanhamos o crescimento da sua menina com muito estilo.</p>
          </div>
        </section>
      </main>

      <Footer/>

    </div>
  );
};

export default Home;