import React, { useEffect, useState } from 'react';
import style from './cardapio.module.css';
import check from '../../assets/check-svgrepo-com.svg';
import local from '../../assets/map-point-svgrepo-com.svg';
import Prato from '../../component/prato/prato';
import Informacoes from '../../component/modal/informacoes/informacoes';
import BotaoPrincipal from '../../component/botao-principal/botaoPrincipal';
import api from '../../api/api';
import logo from '../../assets/logo.png'

function Cardapio() {
    const [pratos, setPratos] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [valorTotal, setValorTotal] = useState(0);

    const handleCloseModal = () => {
        setModalAberto(false);
    };

    useEffect(() => {
        listar();

        const cesta = JSON.parse(sessionStorage.getItem('cesta'));

        let total = 0;
        if (cesta) {
            total = cesta.reduce((acc, item) => acc + parseFloat(item.preco) * item.quantidade, 0);
        }

        setValorTotal(total);
    }, []);

    function listar() {
        api.get()
            .then((respostaObtida) => {
                setPratos(respostaObtida.data);
            })
            .catch((erroOcorrido) => {
                console.log('Erro ao obter os pratos:', erroOcorrido);
            });
    }

    return (
        <>
            <div className={style.corpo}>
                <div className={style.body}>
                    <div className={style.card_informacoes} onClick={() => setModalAberto(true)}>
                        <img src={logo} className={style.foto_perfil} />
                        <div className={style.container_informacoes}>
                            <div className={style.container}>
                                <h3>Delivery Igreja Batista</h3>
                                <div className={style.campo}>
                                    <img src={local} alt="" className={style.icon} />
                                    <span className={style.endereco}>Rua Pres. Oscár Benavides, 58</span>
                                </div>
                                <div className={style.campo}>
                                    <img src={check} alt="" className={style.icon} />
                                    <span className={style.funcionamento}>Aberto até as 15h</span>
                                </div>
                            </div>
                            <a className={style.mais_informacoes} href="#">Mais informações</a>
                        </div>
                    </div>
                    <div className={style.card_pratos}>
                        <div className={style.topo}>
                            <h1>Pratos</h1>
                        </div>
                        {pratos.length > 0 ? (
                            <div className={style.container_pratos}>
                                {pratos.map((prato, index) => (
                                    <Prato
                                        key={index}
                                        id={prato.id}
                                        nome={prato.nome}
                                        resumo={prato.resumo}
                                        preco={prato.preco}
                                        imagem={prato.imagem1}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={style.container_pratos}>
                                <div className={style.prato}>
                                    <div className={style.foto} />
                                    <div className={style.container_texto}>
                                        <h3>‎ </h3>
                                        <span>‎ </span>
                                        <span>‎ </span>
                                        <b className={style.preco}>‎ </b>
                                    </div>
                                </div>
                                <div className={style.prato}>
                                    <div className={style.foto} />
                                    <div className={style.container_texto}>
                                        <h3>‎ </h3>
                                        <span>‎ </span>
                                        <span>‎ </span>
                                        <b className={style.preco}>‎ </b>
                                    </div>
                                </div>
                                <div className={style.prato}>
                                    <div className={style.foto} />
                                    <div className={style.container_texto}>
                                        <h3>‎ </h3>
                                        <span>‎ </span>
                                        <span>‎ </span>
                                        <b className={style.preco}>‎ </b>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <BotaoPrincipal onClick={() => window.location.href = '/pedido'}
                    paginaAtual={"cardapio"} valorTotal={valorTotal} />
            </div>
            {modalAberto && <Informacoes onClose={handleCloseModal} />}
            {/* <ToastContainer /> */}
        </>
    );
};

export default Cardapio;