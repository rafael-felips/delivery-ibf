import React from 'react';
import style from './botaoPrincipal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';

function BotaoPrincipal({ adicionarPrato, valorTotal, paginaAtual, preco, totalCompra }) {
  const textoBotao = paginaAtual === 'cardapio' ? 'Meu Pedido' : 'Adicionar ao Pedido';
  const carrinho = JSON.parse(sessionStorage.getItem('carrinho'));

  let valorBotao = 0;

  let totalPedido = 0;
  if (carrinho) {
    totalPedido = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }

  if (paginaAtual === 'cardapio') {
    valorBotao = totalPedido;
  } else {
    valorBotao = preco
  }

  function substituirPontoPorVirgula(texto) {
    return texto.replace(/\./g, ',');
  }

  const precoFormatado = valorBotao ? substituirPontoPorVirgula(valorBotao.toFixed(2)) : '0,00';

  const handleClick = () => {
    if (paginaAtual === 'cardapio') {
      if (carrinho && carrinho.length > 0) {
        window.location.href = '/pedido';
      } else {
        toast.error('O pedido está vazio.', { autoClose: 3000 });
      }
    } else if (paginaAtual != 'cardapio') {
      window.location.href = '/cardapio'
      adicionarPrato();
    }
  };

  return (
    <>
      <button className={style.botao} onClick={handleClick}>
        <div className={style.icone}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
        <div className={style.texto}>{textoBotao}</div>
        <div className={style.preco}>R$ {precoFormatado}</div>
      </button>
      <ToastContainer />
    </>
  );
}

export default BotaoPrincipal;