import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import style from './prato.module.css';
import BotaoPrincipal from '../../component/botao-principal/botaoPrincipal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from '../../api/api';
import voltar from '../../assets/back.svg';
import { useNavigate } from 'react-router-dom';

function PaginaPrato() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [prato, setPrato] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [observacao, setObservacao] = useState('');
    
    useEffect(() => {
        buscarPrato();
    }, [id]);

    function buscarPrato() {
        api.get()
            .then((respostaObtida) => {
                setPrato(respostaObtida.data[id - 1]);
                console.log(prato)
            })
            .catch((erroOcorrido) => {
                console.log('Erro ao obter os pratos:', erroOcorrido);
            });
    }

    function substituirPontoPorVirgula(texto) {
        return texto.replace(/\./g, ',');
    }

    const precoFormatado = prato ? substituirPontoPorVirgula(prato.preco) : '0,00';

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
        }
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        }
    };
    
    const adicionarPratoNaCesta = () => {
        const itemCesta = {
            id: prato.id,
            nome: prato.nome,
            quantidade: quantidade,
            preco: prato.preco,
            observacao: observacao, // Incluindo a observação
        };
        const cestaAtual = JSON.parse(sessionStorage.getItem('cesta')) || [];
        const pratoExistenteIndex = cestaAtual.findIndex((item) => item.id === itemCesta.id);

        if (pratoExistenteIndex !== -1) {
            cestaAtual[pratoExistenteIndex].quantidade += quantidade;
            cestaAtual[pratoExistenteIndex].preco += itemCesta.preco;
        } else {
            cestaAtual.push(itemCesta);
        }

        sessionStorage.setItem('cesta', JSON.stringify(cestaAtual));
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
        <><div className={style.body}>
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
                        <h1>{prato.nome}</h1>
                        <p>{prato.resumo}</p>
                    </div>
                    <div className={style.containter_serve_preco}>
                        <span>Serve <b>{prato.serve}</b> pessoas</span>
                        <b>R$ {precoFormatado}</b>
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
                    {/* <textarea id="" cols="30" rows="4"></textarea> */}
                    <textarea id="observacao" cols="30" rows="4" value={observacao} onChange={(e) => setObservacao(e.target.value)}></textarea>
                </div>
                <BotaoPrincipal onClick={() => window.location.href = '/cardapio'} adicionarPrato={adicionarPratoNaCesta} preco={prato.preco * quantidade} paginaAtual="prato" />
            </div>
        </div>
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