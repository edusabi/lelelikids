import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./ConjuntoTecido.module.css";

const CORES = {
  Azul: "#8CB0C0",
  Vermelho: "#AE041E",
  "Rosa Bebe": "#D7A3AF",
  Pink: "#C51750",
  
  Bege: "#C5AE8F",
  Off: "#D1C699",
};

const produtos = [
  {
    id: "conjunto-tecido-1",
    nomeSite: "Conjunto de Tecido Infantil",
    nomeWpp: "Conjunto de Tecido Infantil",
    img: "/conjuntoTecido/IMG-20260811-WA0052.jpeg",
    tag: "TECIDO",
    preco: 35,
    tamanhos: ["04", "06", "08", "10"],
    cores: ["Pink", "Vermelho", "Bege", "Azul", "Off", "Rosa Bebe"],
  },
];

const ConjuntoTecido = () => {
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
      const salvo = localStorage.getItem("vyra_cart");
      const carrinho = salvo ? JSON.parse(salvo) : [];

      return Array.isArray(carrinho) ? carrinho : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingPage(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isLoadingPage || isCartOpen || imagemExpandida ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoadingPage, isCartOpen, imagemExpandida]);

  useEffect(() => {
    localStorage.setItem("vyra_cart", JSON.stringify(cart));
  }, [cart]);

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

  const selecionarOpcao = (atualizar, produtoId, valor) => {
    atualizar((anterior) => {
      if (anterior[produtoId] === valor) {
        const novoEstado = { ...anterior };
        delete novoEstado[produtoId];

        return novoEstado;
      }

      return {
        ...anterior,
        [produtoId]: valor,
      };
    });
  };

  const formatarPreco = (valor) =>
    Number(valor || 0).toFixed(2).replace(".", ",");

  const totalItens = cart.reduce(
    (total, item) => total + (Number(item.qtd) || 0),
    0,
  );

  const totalCarrinho = cart.reduce(
    (total, item) =>
      total + (Number(item.preco) || 0) * (Number(item.qtd) || 0),
    0,
  );

  const pecasFaltando = Math.max(0, 10 - totalItens);
  const podeFinalizar = totalItens >= 10;

  const adicionarAoCarrinho = (produto) => {
    const tamanho = tamanhosSelecionados[produto.id];
    const cor = coresSelecionadas[produto.id];

    if (!tamanho) {
      mostrarToast("Por favor, selecione um tamanho antes de adicionar!");
      return;
    }

    if (!cor) {
      mostrarToast("Por favor, selecione uma cor antes de adicionar!");
      return;
    }

    const cartItemId = `${produto.id}-${tamanho}-${cor}`;

    setCart((anterior) => {
      const jaExiste = anterior.some(
        (item) => item.cartItemId === cartItemId,
      );

      if (jaExiste) {
        return anterior.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, qtd: item.qtd + 1 }
            : item,
        );
      }

      return [
        ...anterior,
        {
          ...produto,
          cartItemId,
          tamanho,
          cor,
          qtd: 1,
        },
      ];
    });

    mostrarToast("Produto adicionado ao carrinho!", "success");
  };

  const alterarQuantidade = (cartItemId, delta) => {
    setCart((anterior) =>
      anterior.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              qtd: Math.max(1, Number(item.qtd) + delta),
            }
          : item,
      ),
    );
  };

  const removerProduto = (cartItemId) => {
    setCart((anterior) =>
      anterior.filter((produto) => produto.cartItemId !== cartItemId),
    );
  };

  const finalizarCompraWhatsapp = () => {
    if (!podeFinalizar) {
      mostrarToast(
        `O pedido mínimo é de 10 peças. Faltam ${pecasFaltando} peças.`,
      );
      return;
    }

    let mensagem =
      "Olá! Gostaria de finalizar o meu pedido de *ATACADO*:\n\n*MEU CARRINHO:*\n";

    cart.forEach((item, indice) => {
      const subtotal = item.preco * item.qtd;

      mensagem += `\n${indice + 1}. *${item.nomeWpp}*`;
      mensagem += `\n▫️ Tamanho: *${item.tamanho}*`;
      mensagem += `\n▫️ Cor: *${item.cor}*`;
      mensagem += `\n▫️ Quantidade: ${item.qtd}`;
      mensagem += `\n▫️ Valor Unid: R$ ${formatarPreco(item.preco)}`;
      mensagem += `\n▫️ Subtotal: R$ ${formatarPreco(subtotal)}\n`;
    });

    mensagem += `\n=======================`;
    mensagem += `\n*TOTAL DE PEÇAS: ${totalItens}*`;
    mensagem += `\n*VALOR TOTAL: R$ ${formatarPreco(totalCarrinho)}*`;
    mensagem += `\n=======================`;
    mensagem +=
      "\n\nAguardo as instruções para pagamento e envio!";

    window.open(
      `https://wa.me/5581996530929?text=${encodeURIComponent(mensagem)}`,
      "_blank",
    );
  };

  return (
    <>
      {isLoadingPage && (
        <div className={styles.globalLoaderOverlay}>
          <div className={styles.spinner} />

          <p className={styles.loadingText}>
            CARREGANDO COLEÇÃO...
          </p>
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
            >
              ✕
            </button>

            <img
              className={styles.expandedImg}
              src={imagemExpandida}
              alt="Conjunto de tecido ampliado"
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
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>

          {totalItens > 0 && (
            <span className={styles.cartBadge}>
              {totalItens}
            </span>
          )}
        </button>

        {isCartOpen && (
          <div
            className={styles.cartOverlay}
            onClick={() => setIsCartOpen(false)}
          >
            <aside
              className={styles.cartSidebar}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.cartHeader}>
                <h2>CARRINHO</h2>

                <button
                  type="button"
                  className={styles.closeCartBtn}
                  onClick={() => setIsCartOpen(false)}
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
                  cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className={styles.cartItem}
                    >
                      <div className={styles.cartItemImgBox}>
                        <img
                          src={item.img}
                          alt={item.nomeSite}
                          className={styles.cartItemImg}
                        />
                      </div>

                      <div className={styles.cartItemInfo}>
                        <h4>{item.nomeSite}</h4>

                        <span className={styles.cartItemSize}>
                          Tamanho: {item.tamanho} | Cor: {item.cor}
                        </span>

                        <p className={styles.cartItemPrice}>
                          R$ {formatarPreco(item.preco)}
                        </p>

                        <div className={styles.qtyControls}>
                          <button
                            type="button"
                            onClick={() =>
                              alterarQuantidade(item.cartItemId, -1)
                            }
                          >
                            -
                          </button>

                          <span>{item.qtd}</span>

                          <button
                            type="button"
                            onClick={() =>
                              alterarQuantidade(item.cartItemId, 1)
                            }
                          >
                            +
                          </button>

                          <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() =>
                              removerProduto(item.cartItemId)
                            }
                          >
                            REMOVER
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className={styles.cartFooter}>
                  {!podeFinalizar ? (
                    <div className={styles.atacadoAviso}>
                      Faltam <strong>{pecasFaltando} peças</strong>{" "}
                      para atingir o mínimo de atacado (10).
                    </div>
                  ) : (
                    <div className={styles.atacadoSucesso}>
                      ✓ Mínimo de atacado atingido!
                    </div>
                  )}

                  <div className={styles.totalContainer}>
                    <span>TOTAL:</span>
                    <span>
                      R$ {formatarPreco(totalCarrinho)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`${styles.checkoutBtn} ${
                      !podeFinalizar
                        ? styles.checkoutBtnDisabled
                        : ""
                    }`}
                    onClick={finalizarCompraWhatsapp}
                  >
                    FINALIZAR COMPRA
                  </button>
                </div>
              )}
            </aside>
          </div>
        )}

        <main className={styles.products}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              CONJUNTO DE TECIDO
            </h2>

            <div className={styles.neonLine} />
          </div>

          <div className={styles.productGrid}>
            {produtos.map((produto) => {
              const imagemCarregada = loadedImages[produto.id];
              const tamanhoAtual =
                tamanhosSelecionados[produto.id];
              const corAtual = coresSelecionadas[produto.id];

              return (
                <article
                  key={produto.id}
                  className={styles.productCard}
                >
                  <div className={styles.imagePlaceholder}>
                    {!imagemCarregada && (
                      <div className={styles.skeletonLoader} />
                    )}

                    <img
                      src={produto.img}
                      alt={produto.nomeSite}
                      className={styles.productImg}
                      loading="eager"
                      onClick={() =>
                        setImagemExpandida(produto.img)
                      }
                      onLoad={() =>
                        setLoadedImages((anterior) => ({
                          ...anterior,
                          [produto.id]: true,
                        }))
                      }
                      onError={() =>
                        setLoadedImages((anterior) => ({
                          ...anterior,
                          [produto.id]: true,
                        }))
                      }
                      style={{
                        opacity: imagemCarregada ? 1 : 0,
                      }}
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.infoWrapper}>
                      <div className={styles.titleGroup}>
                        <h3 className={styles.productName}>
                          {produto.nomeSite}
                        </h3>

                        <span className={styles.tag}>
                          {produto.tag}
                        </span>
                      </div>

                      <span className={styles.price}>
                        R$ {formatarPreco(produto.preco)}
                      </span>
                    </div>

                    <div className={styles.colorSelector}>
                      {produto.cores.map((cor) => (
                        <button
                          type="button"
                          key={cor}
                          title={cor}
                          aria-label={`Selecionar cor ${cor}`}
                          className={`${styles.colorBtn} ${
                            corAtual === cor
                              ? styles.activeColor
                              : ""
                          }`}
                          style={{
                            backgroundColor: CORES[cor],
                          }}
                          onClick={() =>
                            selecionarOpcao(
                              setCoresSelecionadas,
                              produto.id,
                              cor,
                            )
                          }
                        />
                      ))}
                    </div>

                    <div className={styles.sizeSelector}>
                      {produto.tamanhos.map((tamanho) => (
                        <button
                          type="button"
                          key={tamanho}
                          className={`${styles.sizeBtn} ${
                            tamanhoAtual === tamanho
                              ? styles.activeSize
                              : ""
                          }`}
                          onClick={() =>
                            selecionarOpcao(
                              setTamanhosSelecionados,
                              produto.id,
                              tamanho,
                            )
                          }
                        >
                          {tamanho}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className={styles.addBtn}
                      onClick={() =>
                        adicionarAoCarrinho(produto)
                      }
                    >
                      + ADICIONAR
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ConjuntoTecido;