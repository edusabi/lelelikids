import styles from './Footer.module.css';

const Footer = () => {
  const instaUrl = "https://www.instagram.com/leleli.kids?igsh=MTd5c25yb2duN2FpaA==";
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/* Seção da Marca */}
        <div className={styles.brandInfo}>
          <h2>Leleli Kids 💗</h2>
        </div>

        {/* Seção de Links */}
        <div className={styles.links}>
          <a href={instaUrl} target="_blank" rel="noreferrer" className={styles.socialLink}>
            Siga nosso Instagram
          </a>
        </div>

      </div>

      {/* Seção de Copyright (Copy) */}
      <div className={styles.copyRight}>
        <p>&copy; {anoAtual} Leleli Kids. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;