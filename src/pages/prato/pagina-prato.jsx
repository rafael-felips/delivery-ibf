import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './prato.module.css';
import BotaoPrincipal from '../../component/botao-principal/botaoPrincipal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from '../../api/api';
import voltar from '../../assets/back.svg';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function PaginaPrato() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [prato, setPrato] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [observacao, setObservacao] = useState('');

    function buscarPrato() {
        api.get()
            .then((respostaObtida) => {
                setPrato(respostaObtida.data[id - 1]);
            })
            .catch((erroOcorrido) => {
                console.log('Erro ao obter os pratos:', erroOcorrido);
            });
    }

    useEffect(() => {
        axios.get('https://script.google.com/macros/s/AKfycbwHNN1j6cOpRmBoMC7nFPfTBbl8625lknKbbB0D7e61DxmyzdBhBEGKElAaMlMZO-WT2A/exec')
            .then(response => {
                console.log(response.data)
                if (!(response.data.Aberto)) { window.location.href = '/' }
            })
            .catch(error => {
                console.error('Houve um problema com a requisição axios:', error.message);
            });
        buscarPrato();
    }, [id]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const aumentarQuantidade = () => {
        if (quantidade < 9) {
            setQuantidade(quantidade + 1);
        } else {
            toast.warn('O maximo é 9')
        }
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        } else {
            toast.error('O minimo é 1')
        }
    };

    const adicionarPratoNoCarrinho = () => {
        const itemCarrinho = {
            id: prato.ID,
            nome: prato.Nome,
            quantidade: quantidade,
            preco: prato.Preço,
            observacao: observacao,
        };
        const carrinhoAtual = JSON.parse(sessionStorage.getItem('carrinho')) || [];
        const pratoExistenteIndex = carrinhoAtual.findIndex((item) => item.id === itemCarrinho.id);

        if (pratoExistenteIndex !== -1) {
            carrinhoAtual[pratoExistenteIndex].quantidade += quantidade;
        } else {
            carrinhoAtual.push(itemCarrinho);
        }

        sessionStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    };

    if (!prato) {
        return (
            <>
                <div className={style.body_carregando}>
                    <div className={style.imagens_carregando}>
                        <div className={style.imagem_carregando} />
                    </div>
                    <div className={style.container}>
                        <div className={style.container_infos_carregando}>
                            <div className={style.container_nome_desc_carregando}>
                                <h1>‎ </h1>
                                <p>‎ </p>
                                <p>‎ </p>
                                <p>‎ </p>
                            </div>
                            <div className={style.containter_serve_preco_carregando}>
                                <span>‎</span>
                                <b>‎</b>
                            </div>
                        </div>
                        <div className={style.container_quantidade_carregando}>
                            <b>‎</b>
                            <div className={style.quantidade_carregando}>

                            </div>
                        </div>
                        <div className={style.container_observacoes_carregando}>
                            <b>‎</b>
                            <textarea id="" cols="30" rows="4"></textarea>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={style.body}>
                <div className={style.imagens}>
                    <img src={voltar} onClick={() => navigate(-1)} className={style.voltar} />
                    <Slider {...settings}>
                        <div className={style.imagem}>
                            <img src={prato.imagem1} />
                        </div>
                        <div>
                            <img src={prato.imagem2} className={style.imagem} />
                        </div>
                        <div>
                            <img src={prato.imagem3} className={style.imagem} />
                        </div>
                    </Slider>
                    <SliderDots />
                </div>
                <div className={style.container}>
                    <div className={style.container_infos}>
                        <div className={style.container_nome_desc}>
                            <h1>{prato.Nome}</h1>
                            <p>{prato.Resumo}</p>
                        </div>
                        <div className={style.containter_serve_preco}>
                            <span>Serve <b>{prato.Serve}</b> pessoas</span>
                            <b>R$ {parseFloat(prato.Preço).toFixed(2).replace('.', ',')}</b>
                        </div>
                    </div>
                    <div className={style.container_quantidade}>
                        <b>Quantidade</b>
                        <div className={style.quantidade}>
                            <button onClick={diminuirQuantidade}>-</button>
                            <span>{quantidade}</span>
                            <button onClick={aumentarQuantidade}>+</button>
                        </div>
                    </div>
                    <div className={style.container_observacoes}>
                        <b>Observações</b>
                        <textarea id="observacao" cols="30" rows="4" value={observacao} onChange={(e) => setObservacao(e.target.value)}></textarea>
                    </div>
                    <BotaoPrincipal onClick={() => window.location.href = '/cardapio'} adicionarPrato={adicionarPratoNoCarrinho} preco={prato.Preço * quantidade} paginaAtual="prato" />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

function SliderDots() {
    return (
        <div className="imagens">
            <style>{`
                .slick-dots {
                    position: absolute;
                    bottom: 10px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    z-index: 1;
                }
            `}</style>
        </div>
    );
}

export default PaginaPrato;