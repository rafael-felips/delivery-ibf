import React, { useEffect, useState } from 'react';
import style from './cardapio.module.css';
import check from '../../assets/check-svgrepo-com.svg';
import local from '../../assets/map-point-svgrepo-com.svg';
import Prato from '../../component/prato/prato';
import Informacoes from '../../component/modal/informacoes/informacoes';
import BotaoPrincipal from '../../component/botao-principal/botaoPrincipal';
import api from '../../api/api';
import logo from '../../assets/logo.png'
import axios from 'axios';
import X from '../../assets/cross.svg'

function Cardapio() {
    const [pratos, setPratos] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [valorTotal, setValorTotal] = useState(0);
    const [infos, setInfos] = useState([])
    const data = new Date();
    const horaAtual = data.getHours();

    const handleCloseModal = () => {
        setModalAberto(false);
    };

    useEffect(() => {
        axios.get('https://script.google.com/macros/s/AKfycbwHNN1j6cOpRmBoMC7nFPfTBbl8625lknKbbB0D7e61DxmyzdBhBEGKElAaMlMZO-WT2A/exec')
            .then(response => {
                setInfos(response.data)
                console.log(response.data)
                if (!(response.data.Aberto)) { window.location.href = '/' }
            })
            .catch(error => {
                console.error('Houve um problema com a requisição axios:', error.message);
            });

        listar();

        const carrinho = JSON.parse(sessionStorage.getItem('carrinho'));

        let total = 0;
        if (carrinho) {
            total = carrinho.reduce((acc, item) => acc + parseFloat(item.preco) * item.quantidade, 0);
        }

        setValorTotal(total);
    }, []);

    function listar() {
        api.get()
            .then((respostaObtida) => {
                setPratos(respostaObtida.data);
                console.log(respostaObtida.data)
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
                                    {infos.Fecha >= horaAtual ?
                                        (
                                            <>
                                                <img src={check} alt="" className={style.icon} />
                                                <span className={style.funcionamento_aberto}>Aberto até as {infos.Fecha}</span>
                                            </>
                                        ) : (
                                            <>
                                                < img src={X} alt="" className={style.icon} />
                                                <span className={style.funcionamento_fechado}>Fechou as {infos.Fecha}</span>
                                            </>
                                        )
                                    }
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
                                {pratos.map((prato) => (
                                    <Prato
                                        key={prato.ID}
                                        id={prato.ID}
                                        nome={prato.Nome}
                                        resumo={prato.Resumo}
                                        preco={prato.Preço}
                                        imagem={prato.imagem1}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={style.container_pratos}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div className={style.prato} key={index}>
                                        <div className={style.foto} />
                                        <div className={style.container_texto}>
                                            <h3>‎</h3>
                                            <span>‎</span>
                                            <span>‎</span>
                                            <b className={style.preco}>‎</b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <BotaoPrincipal onClick={() => window.location.href = '/pedido'}
                    paginaAtual={"cardapio"} valorTotal={valorTotal} />
            </div>
            {modalAberto && <Informacoes onClose={handleCloseModal} infos={infos} />}
        </>
    );
};

export default Cardapio;