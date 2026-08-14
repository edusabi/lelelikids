import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./CalcaAlfaiataria.module.css";

const CalcaAlfaiataria = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  
  // NOVO ESTADO: Controla qual imagem está expandida
  const [imagemExpandida, setImagemExpandida] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [cart, setCart] = useState(() => {
    try {
      const carrinhoSalvo = localStorage.getItem("vyra_cart");

      if (!carrinhoSalvo) {
        return [];
      }

      const carrinhoParseado = JSON.parse(carrinhoSalvo);

      return Array.isArray(carrinhoParseado) ? carrinhoParseado : [];
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState({});

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (produtoId) => {
    setLoadedImages((prev) => ({
      ...prev,
      [produtoId]: true,
    }));
  };

  const mostrarToast = (message, type = "error") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  // ATUALIZADO: Impede o scroll da página também quando a imagem estiver expandida
  useEffect(() => {
    if (isCartOpen || isLoadingPage || imagemExpandida) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen, isLoadingPage, imagemExpandida]);

  useEffect(() => {
    localStorage.setItem("vyra_cart", JSON.stringify(cart));
  }, [cart]);

  const produtos = [
    {
      id: "calca-alfaiataria-amarelo",
      nomeSite: "Calça Alfaiataria Amarelo",
      nomeWpp: "Calça Alfaiataria Amarelo",
      img: "/calcaAlfaiataria/IMG-20260811-WA0006.jpeg",
      tag: "ALFAIATARIA",
      preco: 30.00,
      tamanhos: ["02", "04", "06", "08", "10"],
    },
    {
      id: "calca-alfaiataria-verde-musgo",
      nomeSite: "Calça Alfaiataria Verde Musgo",
      nomeWpp: "Calça Alfaiataria Verde Musgo",
      img: "/calcaAlfaiataria/IMG-20260811-WA0007.jpeg",
      tag: "ALFAIATARIA",
      preco: 30.00,
      tamanhos: ["02", "04", "06", "08", "10"],
    },
    {
      id: "calca-alfaiataria-chiclete",
      nomeSite: "Calça Alfaiataria Chiclete",
      nomeWpp: "Calça Alfaiataria Chiclete",
      img: "/calcaAlfaiataria/IMG-20260811-WA0008.jpeg",
      tag: "ALFAIATARIA",
      preco: 30.00,
      tamanhos: ["02", "04", "06", "08", "10"],
    },
    {
      id: "calca-alfaiataria-chiclete-tamanho02", // Alterei o ID para não repetir o anterior
      nomeSite: "Calça Alfaiataria Chiclete Tamanho 02",
      nomeWpp: "Calça Alfaiataria Chiclete",
      img: "/calcaAlfaiataria/IMG-20260811-WA0048.jpeg",
      tag: "ALFAIATARIA",
      preco: 30.00,
      tamanhos: ["02"],
    },
    {
      id: "calca-alfaiataria-amarelo-tamanho02",
      nomeSite: "Calça Alfaiataria Amarelo Tamanho 02",
      nomeWpp: "Calça Alfaiataria Amarelo",
      img: "/calcaAlfaiataria/IMG-20260811-WA0049.jpeg",
      tag: "ALFAIATARIA",
      preco: 30.00,
      tamanhos: ["02"],
    },
    {
      id: "calca-alfaiataria-Azul-Royal-tamanho02",
      nomeSite: "Calça Alfaiataria Azul Royal Tamanho 02",
      nomeWpp: "Calça Alfaiataria Azul Royal",
      img: "/calcaAlfaiataria/IMG-20260811-WA0050.jpeg",
      tag: "ALFAIATARIA",
      preco: 30.00,
      tamanhos: ["02"],
    },
  ];

  const selecionarTamanho = (produtoId, tamanho) => {
    setTamanhosSelecionados((prev) => {
      if (prev[produtoId] === tamanho) {
        const novoEstado = { ...prev };
        delete novoEstado[produtoId];
        return novoEstado;
      }
      return {
        ...prev,
        [produtoId]: tamanho,
      };
    });
  };

  const obterPreco = (item) => {
    const possiveisPrecos = [
      item?.preco,
      item?.precoAtacado,
      item?.precoVenda,
      item?.valor,
    ];

    const precoEncontrado = possiveisPrecos.find(
      (preco) =>
        preco !== undefined && preco !== null && !Number.isNaN(Number(preco)),
    );

    return precoEncontrado !== undefined ? Number(precoEncontrado) : 0;
  };

  const formatarPreco = (valor) => {
    const numero = Number(valor);
    if (!Number.isFinite(numero)) return "0,00";
    return numero.toFixed(2).replace(".", ",");
  };

  const adicionarAoCarrinho = (produto) => {
    const tamanhoEscolhido = tamanhosSelecionados[produto.id];

    if (!tamanhoEscolhido) {
      mostrarToast("Por favor, selecione um tamanho antes de adicionar!", "error");
      return;
    }

    const cartItemId = `${produto.id}-${tamanhoEscolhido}`;

    setCart((prevCart) => {
      const itemExiste = prevCart.find((item) => item.cartItemId === cartItemId);

      if (itemExiste) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, qtd: Number(item.qtd || 0) + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...produto,
          cartItemId,
          tamanho: tamanhoEscolhido,
          qtd: 1,
        },
      ];
    });

    mostrarToast("Produto adicionado ao carrinho!", "success");
  };

  const alterarQuantidade = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartItemId === cartItemId) {
          const quantidadeAtual = Number(item.qtd) || 1;
          const novaQtd = quantidadeAtual + delta;
          return {
            ...item,
            qtd: novaQtd > 0 ? novaQtd : 1,
          };
        }
        return item;
      })
    );
  };

  const removerItem = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const totalItens = cart.reduce((acc, item) => acc + (Number(item.qtd) || 0), 0);

  const totalCarrinho = cart.reduce((acc, item) => {
    const preco = obterPreco(item);
    const quantidade = Number(item.qtd) || 0;
    return acc + preco * quantidade;
  }, 0);

  const pecasFaltando = Math.max(0, 10 - totalItens);
  const podeFinalizar = totalItens >= 10;

  const finalizarCompraWhatsapp = () => {
    if (!podeFinalizar) {
      mostrarToast(`O pedido mínimo é de 10 peças. Faltam ${pecasFaltando} peças.`, "error");
      return;
    }

    const numeroWpp = "5581995782112";
    let mensagem = "Olá! Gostaria de finalizar o meu pedido de *ATACADO*:\n\n";

    mensagem += "*MEU CARRINHO:*\n";

    cart.forEach((item, index) => {
      const preco = obterPreco(item);
      const quantidade = Number(item.qtd) || 0;
      const subtotal = preco * quantidade;

      mensagem += `\n${index + 1}. *${item.nomeWpp || item.nomeSite || "Produto"}*`;
      mensagem += `\n▫️ Tamanho: *${item.tamanho || "Não informado"}*`;
      mensagem += `\n▫️ Quantidade: ${quantidade}`;
      mensagem += `\n▫️ Valor Unid: R$ ${formatarPreco(preco)}`;
      mensagem += `\n▫️ Subtotal: R$ ${formatarPreco(subtotal)}\n`;
    });

    mensagem += "\n=======================";
    mensagem += `\n*TOTAL DE PEÇAS: ${totalItens}*`;
    mensagem += `\n*VALOR TOTAL: R$ ${formatarPreco(totalCarrinho)}*`;
    mensagem += "\n=======================\n";
    mensagem += "\nAguardo as instruções para pagamento e envio!";

    const urlFormatada = encodeURIComponent(mensagem);
    window.open(`https://wa.me/${numeroWpp}?text=${urlFormatada}`, "_blank");
  };

  return (
    <>
      {isLoadingPage && (
        <div className={styles.globalLoaderOverlay}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>CARREGANDO COLEÇÃO...</p>
        </div>
      )}

      {/* NOVO: Modal de Imagem Expandida */}
      {imagemExpandida && (
        <div 
          className={styles.imageModalOverlay} 
          onClick={() => setImagemExpandida(null)}
        >
          <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeImageModalBtn} 
              onClick={() => setImagemExpandida(null)}
            >
              ✕
            </button>
            <img src={imagemExpandida} alt="Produto Ampliado" className={styles.expandedImg} />
          </div>
        </div>
      )}

      <div className={styles.container}>
        <Header />

        {toast.show && (
          <div
            className={`
              ${styles.toast}
              ${toast.type === "error" ? styles.toastError : styles.toastSuccess}
            `}
          >
            {toast.message}
          </div>
        )}

        <button
          className={styles.floatingCartBtn}
          onClick={() => setIsCartOpen(true)}
          aria-label="Abrir carrinho"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>

          {totalItens > 0 && (
            <span className={styles.cartBadge}>{totalItens}</span>
          )}
        </button>

        {isCartOpen && (
          <div className={styles.cartOverlay} onClick={() => setIsCartOpen(false)}>
            <div className={styles.cartSidebar} onClick={(e) => e.stopPropagation()}>
              <div className={styles.cartHeader}>
                <h2>CARRINHO</h2>
                <button
                  className={styles.closeCartBtn}
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Fechar carrinho"
                >
                  ✕
                </button>
              </div>

              <div className={styles.cartItemsContainer}>
                {cart.length === 0 ? (
                  <p className={styles.emptyCartMsg}>Seu carrinho está vazio.</p>
                ) : (
                  cart.map((item) => {
                    const preco = obterPreco(item);
                    const quantidade = Number(item.qtd) || 0;

                    return (
                      <div key={item.cartItemId} className={styles.cartItem}>
                        <div className={styles.cartItemImgBox}>
                          <img
                            src={item.img}
                            alt={item.nomeSite || "Produto"}
                            className={styles.cartItemImg}
                          />
                        </div>
                        <div className={styles.cartItemInfo}>
                          <h4 title={item.nomeSite}>{item.nomeSite || "Produto"}</h4>
                          <span className={styles.cartItemSize}>
                            Tamanho: {item.tamanho || "N/A"}
                          </span>
                          <p className={styles.cartItemPrice}>
                            R$ {formatarPreco(preco)}
                          </p>

                          <div className={styles.qtyControls}>
                            <button onClick={() => alterarQuantidade(item.cartItemId, -1)}>-</button>
                            <span>{quantidade}</span>
                            <button onClick={() => alterarQuantidade(item.cartItemId, 1)}>+</button>
                            <button
                              className={styles.removeBtn}
                              onClick={() => removerItem(item.cartItemId)}
                            >
                              REMOVER
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {cart.length > 0 && (
                <div className={styles.cartFooter}>
                  {!podeFinalizar ? (
                    <div className={styles.atacadoAviso}>
                      Faltam <strong>{pecasFaltando} peças</strong> para atingir o mínimo de atacado (10).
                    </div>
                  ) : (
                    <div className={styles.atacadoSucesso}>✓ Mínimo de atacado atingido!</div>
                  )}

                  <div className={styles.totalContainer}>
                    <span>TOTAL:</span>
                    <span>R$ {formatarPreco(totalCarrinho)}</span>
                  </div>

                  <button
                    className={`
                      ${styles.checkoutBtn}
                      ${!podeFinalizar ? styles.checkoutBtnDisabled : ""}
                    `}
                    onClick={finalizarCompraWhatsapp}
                  >
                    FINALIZAR COMPRA
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <main className={styles.products}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>CALÇAS DE ALFAIATARIA</h2>
            <div className={styles.neonLine} />
          </div>

          <div className={styles.productGrid}>
            {produtos.map((produto, index) => {
              const tamanhoAtual = tamanhosSelecionados[produto.id];
              const isLoaded = loadedImages[produto.id];

              return (
                <div key={produto.id} className={styles.productCard}>
                  <div className={styles.imagePlaceholder}>
                    {!isLoaded && <div className={styles.skeletonLoader} />}
                    <img
                      src={produto.img}
                      alt={produto.nomeSite}
                      className={styles.productImg}
                      onClick={() => setImagemExpandida(produto.img)} // NOVO: Ação de click
                      loading={index < 4 ? "eager" : "lazy"}
                      onLoad={() => handleImageLoad(produto.id)}
                      onError={(e) => {
                        handleImageLoad(produto.id);
                        e.target.style.opacity = 1;
                      }}
                      style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.infoWrapper}>
                      <div className={styles.titleGroup}>
                        <h3 className={styles.productName}>{produto.nomeSite}</h3>
                        <span className={styles.tag}>{produto.tag}</span>
                      </div>
                      <span className={styles.price}>R$ {formatarPreco(produto.preco)}</span>
                    </div>

                    <div className={styles.sizeSelector}>
                      {produto.tamanhos.map((tamanho) => (
                        <button
                          key={tamanho}
                          onClick={() => selecionarTamanho(produto.id, tamanho)}
                          className={`
                            ${styles.sizeBtn}
                            ${tamanhoAtual === tamanho ? styles.activeSize : ""}
                          `}
                        >
                          {tamanho}
                        </button>
                      ))}
                    </div>

                    <button
                      className={styles.addBtn}
                      onClick={() => adicionarAoCarrinho(produto)}
                    >
                      + ADICIONAR
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CalcaAlfaiataria;