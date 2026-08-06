import styles from './LinkBio.module.css';

const LinkBio = () => {

  const links = [
    {
      id: 1,
      title: "GRUPO DE ATACADO",
      url: "https://chat.whatsapp.com/GnYY2piP5dP9nLWOf7Gn56?s=cl&p=a&ilr=4",
      image:"/logoGrupo.png"
    },
    {
      id: 2,
      title: "FALAR COM VENDEDOR",
      url: "https://wa.me/5581996530929",
      image:"/logoZap.png"
    },
    {
      id: 3,
      title: "INSTAGRAM",
      url:"https://www.instagram.com/leleli.kids?igsh=MTd5c25yb2duN2FpaA==",
      image:"/logoInsta.png"
    }
  ];

  return (
    <div className={styles.wrapper}>

      <main className={styles.container}>

        <div className={styles.header}></div>

        <div className={styles.profileContainer}>
          <img 
            src="/logo.jpg"
            className={styles.profilePic}
            alt="Leleli Kids"
          />
        </div>

        <section className={styles.info}>

          <h1>
            Leleli Kids
          </h1>

          <p>
            Moda infantil feita para deixar
            cada momento ainda mais especial ✨
          </p>

        </section>

        <div className={styles.socials}>

          {links.map(link => (

            <a 
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >

              <img
                src={link.image}
                className={styles.icon}
                alt=""
                style={{ filter: "brightness(0) invert(100%)" }}
              />

            </a>

          ))}

        </div>

        <div className={styles.linksContainer}>

          {links.map(link => (

            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={styles.linkCard}
            >

              <img
                src={link.image}
                className={styles.linkImage}
                alt=""
                style={{ filter: "brightness(0) invert(100%)" }}
              />

              <span className={styles.title}>
                {link.title}
              </span>

            </a>

          ))}

        </div>

        <footer>
          Leleli Kids 💗
        </footer>

      </main>

    </div>
  )
}

export default LinkBio;