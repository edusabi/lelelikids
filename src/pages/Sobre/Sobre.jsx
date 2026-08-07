import styles from "./Sobre.module.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Sobre = () => {
  const vendedorUrl = "https://wa.me/5581996530929";
  const instaUrl =
    "https://www.instagram.com/leleli.kids?igsh=MTd5c25yb2duN2FpaA==";

  return (
    <div>
      <div className={styles.socials}>
        <a
          href={instaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.socialButton} ${styles.instagram}`}
        >
          <FaInstagram />
          <span>Instagram</span>
        </a>

        <a
          href={vendedorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.socialButton} ${styles.whatsapp}`}
        >
          <FaWhatsapp />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default Sobre;
