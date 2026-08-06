import styles from './LinkBio.module.css';

const LinkBio = () => {
  const links = [
    {
      id: 1,
      title: "GRUPO DE ATACADO",
      url: "https://chat.whatsapp.com/DH0s9MnN2kD9Fol8GrFRox?mode=gi_t",
      image:"/logoGrupo.png"
    },
    {
      id: 2,
      title: "FALAR COM VENDEDOR",
      url: "https://wa.me/5581996457525",
      image: "/logoZap.png"
    },
    {
      id: 3,
      title: "INSTAGRAM",
      url: "https://www.instagram.com/centralcapitalfitness?igsh=dXV1eDljdm5veWV4",
      image: "/logoInsta.png" 
    }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        <div className={styles.header}></div>

        <div className={styles.profileContainer}>
          <img 
            src="#" 
            alt="" 
            className={styles.profilePic} 
          />
        </div>

        {/* Título e Subtítulo */}
        <div className={styles.info}>
          <h1 className={styles.name}>Leleli Kids</h1>
          <p className={styles.subtitle}>Seu próximo nível começa no que você veste.</p>
        </div>

        <div className={styles.socials}>
          {links.map((link) => (
            <a key={`icon-${link.id}`} href={link.url} target="_blank" rel="noopener noreferrer">
              <img 
                src={link.image} 
                alt={`Ícone ${link.title}`} 
                className={styles.icon} 
                style={{ objectFit: 'contain' }}
              />
            </a>
          ))}
        </div>

        {/* Lista de Links */}
        <div className={styles.linksContainer}>
          {links.map((link) => (
            <a key={link.id} href={link.url} className={styles.linkCard} target="_blank" rel="noopener noreferrer">
              <img src={link.image} alt={`Imagem do link ${link.title}`} className={styles.linkImage} />
              <span className={styles.linkText}>{link.title}</span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}

export default LinkBio;