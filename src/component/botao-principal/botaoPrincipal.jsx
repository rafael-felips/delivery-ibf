import React from 'react';
import style from './botaoPrincipal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function BotaoPrincipal({ adicionarPrato, valorTotal, paginaAtual, preco, totalCompra }) {
  const textoBotao = paginaAtual === 'cardapio' ? 'Meu Pedido' : 'Adicionar ao Pedido';
  const cesta = JSON.parse(sessionStorage.getItem('cesta'));

  let valorBotao = 0;

  let totalPedido = 0;
  if (cesta) {
    totalPedido = cesta.reduce((total, item) => total + (item.preco * item.quantidade), 0);
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

  // const handleClick = () => {
  //   adicionarPrato();
  //   if (paginaAtual != 'cardapio') {
  //     window.location.href = '/cardapio'
  //   };
  // }

  const handleClick = () => {
    if (paginaAtual === 'cardapio') {
      if (cesta && cesta.length > 0) {
        window.location.href = '/pedido'; // Redirecionar para a página de pedido
      } else {
        alert('A cesta está vazia. Adicione itens antes de prosseguir para o pedido.');
      }
    } else if (paginaAtual != 'cardapio') {
      // alert('entrou no else if')
      window.location.href = '/cardapio'
      adicionarPrato();
    }
  };

  return (
    <button className={style.botao} onClick={handleClick}>
      <div className={style.icone}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
      <div className={style.texto}>{textoBotao}</div>
      <div className={style.preco}>R$ {precoFormatado}</div>
    </button>
  );
}

export default BotaoPrincipal;