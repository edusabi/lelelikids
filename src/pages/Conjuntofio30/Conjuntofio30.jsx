import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Conjuntofio30.module.css";

const Conjuntofio30 = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [imagemExpandida, setImagemExpandida] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState({});
  const [coresSelecionadas, setCoresSelecionadas] = useState({});
  const [loadedImages, setLoadedImages] = useState({});
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const [cart, setCart] = useState(() => {
    try {
      const carrinhoSalvo = localStorage.getItem("vyra_cart");

      if (!carrinhoSalvo) return [];

      const carrinhoParseado = JSON.parse(carrinhoSalvo);
      return Array.isArray(carrinhoParseado) ? carrinhoParseado : [];
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      return [];
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  const mapaCores = {
    Salmao: "#EF6B52",
    Pêssego: "#F59D4B",
    Pink: "#B2054A",
    Chiclete: "#FC7EA3",
    Azul: "#627AA8",
  };

  // Esta página possui somente uma foto e, por isso, somente um produto.
  // Coloque a imagem em: public/conjuntoFio30/conjunto-fio-30.jpeg
  const produtos = [
    {
      id: "conjunto-fio-30-1",
      nomeSite: "Conjunto Fio 30",
      nomeWpp: "Conjunto Fio 30",
      img: "/conjuntoFio30/IMG-20260811-WA0051.jpeg",
      tag: "FIO 30",
      preco: 25,
      tamanhos: ["02", "04", "06", "08", "10"],
      cores: [
        "Salmao",
        "Pêssego",
        "Chiclete",
        "Azul",
        "Pink",
      ],
    },
  ];

  const handleImageLoad = (produtoId) => {
    setLoadedImages((estadoAnterior) => ({
      ...estadoAnterior,
      [produtoId]: true,
    }));
  };

  const mostrarToast = (message, type = "error") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const selecionarTamanho = (produtoId, tamanho) => {
    setTamanhosSelecionados((estadoAnterior) => {
      if (estadoAnterior[produtoId] === tamanho) {
        const novoEstado = { ...estadoAnterior };
        delete novoEstado[produtoId];
        return novoEstado;
      }

      return { ...estadoAnterior, [produtoId]: tamanho };
    });
  };

  const selecionarCor = (produtoId, corNome) => {
    setCoresSelecionadas((estadoAnterior) => {
      if (estadoAnterior[produtoId] === corNome) {
        const novoEstado = { ...estadoAnterior };
        delete novoEstado[produtoId];
        return novoEstado;
      }

      return { ...estadoAnterior, [produtoId]: corNome };
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
        preco !== undefined &&
        preco !== null &&
        !Number.isNaN(Number(preco)),
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
    const corEscolhida = coresSelecionadas[produto.id];

    if (!tamanhoEscolhido) {
      mostrarToast(
        "Por favor, selecione um tamanho antes de adicionar!",
        "error",
      );
      return;
    }

    if (!corEscolhida) {
      mostrarToast(
        "Por favor, selecione uma cor antes de adicionar!",
        "error",
      );
      return;
    }

    const cartItemId = `${produto.id}-${tamanhoEscolhido}-${corEscolhida}`;

    setCart((carrinhoAnterior) => {
      const itemExiste = carrinhoAnterior.find(
        (item) => item.cartItemId === cartItemId,
      );

      if (itemExiste) {
        return carrinhoAnterior.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, qtd: Number(item.qtd || 0) + 1 }
            : item,
        );
      }

      return [
        ...carrinhoAnterior,
        {
          ...produto,
          cartItemId,
          tamanho: tamanhoEscolhido,
          cor: corEscolhida,
          qtd: 1,
        },
      ];
    });

    mostrarToast("Produto adicionado ao carrinho!", "success");
  };

  const alterarQuantidade = (cartItemId, delta) => {
    setCart((carrinhoAnterior) =>
      carrinhoAnterior.map((item) => {
        if (item.cartItemId === cartItemId) {
          const quantidadeAtual = Number(item.qtd) || 1;
          const novaQuantidade = quantidadeAtual + delta;

          return {
            ...item,
            qtd: novaQuantidade > 0 ? novaQuantidade : 1,
          };
        }

        return item;
      }),
    );
  };

  const removerItem = (cartItemId) => {
    setCart((carrinhoAnterior) =>
      carrinhoAnterior.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  const totalItens = cart.reduce(
    (total, item) => total + (Number(item.qtd) || 0),
    0,
  );

  const totalCarrinho = cart.reduce((total, item) => {
    const preco = obterPreco(item);
    const quantidade = Number(item.qtd) || 0;
    return total + preco * quantidade;
  }, 0);

  const pecasFaltando = Math.max(0, 10 - totalItens);
  const podeFinalizar = totalItens >= 10;

  const finalizarCompraWhatsapp = () => {
    if (!podeFinalizar) {
      mostrarToast(
        `O pedido mínimo é de 10 peças. Faltam ${pecasFaltando} peças.`,
        "error",
      );
      return;
    }

    const numeroWpp = "5581996530929";
    let mensagem =
      "Olá! Gostaria de finalizar o meu pedido de *ATACADO*:\n\n";

    mensagem += "*MEU CARRINHO:*\n";

    cart.forEach((item, index) => {
      const preco = obterPreco(item);
      const quantidade = Number(item.qtd) || 0;
      const subtotal = preco * quantidade;

      mensagem += `\n${index + 1}. *${
        item.nomeWpp || item.nomeSite || "Produto"
      }*`;
      mensagem += `\n▫️ Tamanho: *${item.tamanho || "Não informado"}*`;
      mensagem += `\n▫️ Cor: *${item.cor || "Não informada"}*`;
      mensagem += `\n▫️ Quantidade: ${quantidade}`;
      mensagem += `\n▫️ Valor Unid: R$ ${formatarPreco(preco)}`;
      mensagem += `\n▫️ Subtotal: R$ ${formatarPreco(subtotal)}\n`;
    });

    mensagem += "\n=======================";
    mensagem += `\n*TOTAL DE PEÇAS: ${totalItens}*`;
    mensagem += `\n*VALOR TOTAL: R$ ${formatarPreco(totalCarrinho)}*`;
    mensagem += "\n=======================\n";
    mensagem += "\nAguardo as instruções para pagamento e envio!";

    const mensagemFormatada = encodeURIComponent(mensagem);

    window.open(
      `https://wa.me/${numeroWpp}?text=${mensagemFormatada}`,
      "_blank",
    );
  };

  return (
    <>
      {isLoadingPage && (
        <div className={styles.globalLoaderOverlay}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>CARREGANDO COLEÇÃO...</p>
        </div>
      )}

      {imagemExpandida && (
        <div
          className={styles.imageModalOverlay}
          onClick={() => setImagemExpandida(null)}
        >
          <div
            className={styles.imageModalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeImageModalBtn}
              onClick={() => setImagemExpandida(null)}
              aria-label="Fechar imagem ampliada"
            >
              ✕
            </button>

            <img
              src={imagemExpandida}
              alt="Produto ampliado"
              className={styles.expandedImg}
            />
          </div>
        </div>
      )}

      <div className={styles.container}>
        <Header />

        {toast.show && (
          <div
            className={`${styles.toast} ${
              toast.type === "error"
                ? styles.toastError
                : styles.toastSuccess
            }`}
          >
            {toast.message}
          </div>
        )}

        <button
          type="button"
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
            aria-hidden="true"
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
          <div
            className={styles.cartOverlay}
            onClick={() => setIsCartOpen(false)}
          >
            <div
              className={styles.cartSidebar}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.cartHeader}>
                <h2>CARRINHO</h2>

                <button
                  type="button"
                  className={styles.closeCartBtn}
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Fechar carrinho"
                >
                  ✕
                </button>
              </div>

              <div className={styles.cartItemsContainer}>
                {cart.length === 0 ? (
                  <p className={styles.emptyCartMsg}>
                    Seu carrinho está vazio.
                  </p>
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
                          <h4 title={item.nomeSite}>
                            {item.nomeSite || "Produto"}
                          </h4>

                          <span className={styles.cartItemSize}>
                            Tamanho: {item.tamanho || "N/A"} | Cor:{" "}
                            {item.cor || "N/A"}
                          </span>

                          <p className={styles.cartItemPrice}>
                            R$ {formatarPreco(preco)}
                          </p>

                          <div className={styles.qtyControls}>
                            <button
                              type="button"
                              onClick={() =>
                                alterarQuantidade(item.cartItemId, -1)
                              }
                              aria-label="Diminuir quantidade"
                            >
                              -
                            </button>

                            <span>{quantidade}</span>

                            <button
                              type="button"
                              onClick={() =>
                                alterarQuantidade(item.cartItemId, 1)
                              }
                              aria-label="Aumentar quantidade"
                            >
                              +
                            </button>

                            <button
                              type="button"
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
                      Faltam <strong>{pecasFaltando} peças</strong> para atingir
                      o mínimo de atacado (10).
                    </div>
                  ) : (
                    <div className={styles.atacadoSucesso}>
                      ✓ Mínimo de atacado atingido!
                    </div>
                  )}

                  <div className={styles.totalContainer}>
                    <span>TOTAL:</span>
                    <span>R$ {formatarPreco(totalCarrinho)}</span>
                  </div>

                  <button
                    type="button"
                    className={`${styles.checkoutBtn} ${
                      !podeFinalizar ? styles.checkoutBtnDisabled : ""
                    }`}
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
            <h2 className={styles.sectionTitle}>CONJUNTO FIO 30</h2>
            <div className={styles.neonLine} />
          </div>

          <div className={styles.productGrid}>
            {produtos.map((produto) => {
              const tamanhoAtual = tamanhosSelecionados[produto.id];
              const corAtual = coresSelecionadas[produto.id];
              const isLoaded = loadedImages[produto.id];

              return (
                <div key={produto.id} className={styles.productCard}>
                  <div className={styles.imagePlaceholder}>
                    {!isLoaded && <div className={styles.skeletonLoader} />}

                    <img
                      src={produto.img}
                      alt={produto.nomeSite}
                      className={styles.productImg}
                      onClick={() => setImagemExpandida(produto.img)}
                      loading="eager"
                      onLoad={() => handleImageLoad(produto.id)}
                      onError={() => handleImageLoad(produto.id)}
                      style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.infoWrapper}>
                      <div className={styles.titleGroup}>
                        <h3 className={styles.productName}>
                          {produto.nomeSite}
                        </h3>
                        <span className={styles.tag}>{produto.tag}</span>
                      </div>

                      <span className={styles.price}>
                        R$ {formatarPreco(produto.preco)}
                      </span>
                    </div>

                    <div className={styles.colorSelector}>
                      {produto.cores.map((corNome) => (
                        <button
                          type="button"
                          key={corNome}
                          title={corNome}
                          onClick={() => selecionarCor(produto.id, corNome)}
                          style={{ backgroundColor: mapaCores[corNome] }}
                          className={`${styles.colorBtn} ${
                            corAtual === corNome ? styles.activeColor : ""
                          }`}
                          aria-label={`Selecionar cor ${corNome}`}
                        />
                      ))}
                    </div>

                    <div className={styles.sizeSelector}>
                      {produto.tamanhos.map((tamanho) => (
                        <button
                          type="button"
                          key={tamanho}
                          onClick={() =>
                            selecionarTamanho(produto.id, tamanho)
                          }
                          className={`${styles.sizeBtn} ${
                            tamanhoAtual === tamanho ? styles.activeSize : ""
                          }`}
                        >
                          {tamanho}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
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

export default Conjuntofio30;