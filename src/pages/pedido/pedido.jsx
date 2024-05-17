import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './pedido.module.css';
import { FaEdit } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import moto from '../../assets/moto.svg';
import retirada from '../../assets/retirada.svg';
import Dinheiro from '../../component/modal/dinheiro/dinheiro';
import Pix from '../../component/modal/pix/pix';
import { buscarCep } from '../../api/apicep';
import ResumoPedido from '../../component/modal/resumo-pedido/resumo-pedido';

function Pedido() {
    const [formaEntrega, setFormaEntrega] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');

    const [entregaAtiva, setEntregaAtiva] = useState(false);
    const [retiradaAtiva, setRetiradaAtiva] = useState(false);

    const [modalDinheiro, setModalDinheiro] = useState(false);
    const [modalPix, setModalPix] = useState(false);
    const [modalResumo, setModalResumo] = useState(false);

    const [pixAtivo, setPixAtivo] = useState(false);
    const [dinheiroAtivo, setDinheiroAtivo] = useState(false);
    const [debitoAtivo, setDebitoAtivo] = useState(false);
    const [creditoAtivo, setCreditoAtivo] = useState(false);

    const [carrinho, setCarrinho] = useState([]);

    const [taxaEntrega, setTaxaEntrega] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [troco, setTroco] = useState(0)
    const [cliente, setCliente] = useState({
        nome: '',
        telefone: ''
    })
    const [endereco, setEndereco] = useState({
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
    });
    const [pedido, setPedido] = useState({
        dataHora: '',
        cliente: '',
        telefone: '',
        carrinho: [{
            item: '',
            quantidade: '',
            preco: '',
        }],
        entrega: {
            taxa: 0,
            forma: '',
            rua: '',
            numero: '',
            bairro: '',
            complemento: '',
        },
        pagamento: {
            forma: '',
            troco: 0,
        }
    })

    useEffect(() => {
        const cesta = JSON.parse(sessionStorage.getItem('cesta'));
        // console.log(cesta)

        let total = 0;
        if (cesta) {
            total = cesta.reduce((acc, item) => acc + parseFloat(item.preco) * item.quantidade, 0);
        } else if (!cesta || cesta === 0) {
            // window.location.href = '/';
        }

        setCarrinho(cesta);
        setValorTotal(total);
    }, []);

    const handleFormaEntrega = (forma) => {
        setFormaEntrega(forma);
    };


    const handleEntregaClick = () => {
        if (entregaAtiva) {
            setEntregaAtiva(false);
        } else {
            setEntregaAtiva(true);
            setRetiradaAtiva(false);
            handleFormaEntrega("Entrega")
            setTaxaEntrega(2)
            setEndereco({
                cep: '',
                rua: '',
                numero: '',
                complemento: '',
                bairro: '',
            });
        }
    };

    const handleRetiradaClick = () => {
        if (retiradaAtiva) {
            setRetiradaAtiva(false);
        } else {
            handleFormaEntrega("Retirada");
            setRetiradaAtiva(true);
            setEntregaAtiva(false);
            setTaxaEntrega(0)
            setEndereco({
                cep: '08471-250',
                rua: 'Rua Presidente Oscár Benavides',
                numero: '58',
                complemento: 'Igreja',
                bairro: 'Cidade Tiradentes',
            });
        }
    };


    const handleFormaPagamento = (forma) => {
        setFormaPagamento(forma);
    };

    const handlePixClick = () => {
        setModalPix(true);
    };

    const handleDinheiroClick = () => {
        setModalDinheiro(true);
    };

    const handleDebitoClick = () => {
        setPixAtivo(false);
        setDinheiroAtivo(false)
        setDebitoAtivo(!debitoAtivo);
        setCreditoAtivo(false);
        handleFormaPagamento("Débito")
    };

    const handleCreditoClick = () => {
        setPixAtivo(false);
        setDinheiroAtivo(false)
        setDebitoAtivo(false);
        setCreditoAtivo(!creditoAtivo);
        handleFormaPagamento("Credito")
    };

    const handleConfirmarPix = () => {
        setModalPix(false);
        setPixAtivo(modalPix);
        setDinheiroAtivo(false)
        setDebitoAtivo(false);
        setCreditoAtivo(false);
        handleFormaPagamento("Pix")
    };

    const handlePixClose = () => {
        setModalPix(false);
    };

    const handleConfirmarDinheiro = (troco) => {
        setModalDinheiro(false);
        setDinheiroAtivo(modalDinheiro);
        setPixAtivo(false);
        setDebitoAtivo(false);
        setCreditoAtivo(false);
        handleFormaPagamento("Dinheiro");

        setTroco(troco);

        console.log(troco)
    };


    const handleDinheiroClose = () => {
        setModalDinheiro(false);
    };

    const handleCepChange = async (event) => {
        const cep = event.target.value ? event.target.value.replace('-', '') : '';
        if (cep.length === 8) {
            const data = await buscarCep(cep);
            if (data) {
                setEndereco({
                    cep: cep,
                    rua: data.logradouro,
                    bairro: data.bairro,
                });
            }
        }
    };

    const handleAbrirResumo = () => {
        if (carrinho.length === 0) {
            toast.error('Adicione itens ao carrinho.', { autoClose: 3000 });
        } else if (cliente.nome.length < 3) {
            toast.error('Nome inválido', { autoClose: 3000 });
        } else if (cliente.telefone.replace(/\D/g, '').length !== 11) {
            toast.error('Número de telefone inválido.', { autoClose: 3000 });
        } else if (formaEntrega === 'Entrega' && (endereco.rua === '' || endereco.numero === '')) {
            toast.error('Preencha o nome da rua e o número.', { autoClose: 3000 });
        } else if (formaPagamento === '') {
            toast.error('Selecione uma forma de pagamento.', { autoClose: 3000 });
        } else {
            setModalResumo(true);
        }
    };

    const handleFecharResumo = () => {
        setModalResumo(false);
    }

    const handleConfirmarPedido = () => {
        const dataHora = new Date();
        const clienteNome = cliente.nome.trim();
        const clienteTelefone = cliente.telefone;
        const carrinhoAtual = carrinho;
        const enderecoEntrega = {
            taxa: taxaEntrega,
            forma: formaEntrega,
            rua: endereco.rua.trim(),
            numero: endereco.numero.trim(),
            complemento: endereco.complemento.trim(),
            bairro: endereco.bairro.trim(),
        };

        console.log(carrinhoAtual)

        setPedido({
            dataHora: dataHora,
            cliente: clienteNome,
            telefone: clienteTelefone,
            carrinho: carrinhoAtual,
            entrega: enderecoEntrega,
            pagamento: {
                forma: formaPagamento,
                troco: troco,
            }
        })

        handleAbrirResumo();
        // console.log(pedido)
    };

    const handleNomeBlur = (event) => {
        const nome = event.target.value.trim();
        if (nome.length < 3) {
            toast.error('O nome deve ter pelo menos 3 letras.', { autoClose: 3000 });
        }
    };

    const handleTelefoneBlur = (event) => {
        const telefone = event.target.value.replace(/\D/g, '');
        if (telefone.length !== 11) {
            toast.error('Número de telefone inválido', { autoClose: 3000 });
        }
    };

    return (
        <>
            <div className={style.body}>
                <h1>Meu Pedido</h1>
                <div className={style.container_itens}>
                    <div className={style.container_titulos}>
                        <b>Itens</b>
                        <b>Preço</b>
                    </div>
                    {carrinho.map((item, index) => (
                        <div key={index} className={style.container_item}>
                            <div className={style.item}>
                                <span>
                                    <b>{item.quantidade}×</b> {item.nome}
                                </span>
                                <span>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                                {/* <span>R$ {(parseFloat(item.preco.replace(',', '.')) * item.quantidade).toFixed(2).replace('.', ',')}</span> */}
                            </div>
                            <FaEdit className={style.editar} />
                        </div>
                    ))}
                    <div className={style.container_item}>
                        <div className={style.item}>
                            <span>Taxa de entrega</span>
                            <span>R$ {taxaEntrega.toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                    <div className={style.container_total}>
                        <span>Total</span>
                        <span>R$ {(valorTotal + taxaEntrega).toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
                <div className={style.container_nome_telefone}>
                    <div className={style.campo}>
                        <span>Nome *</span>
                        <input
                            type="text"
                            placeholder="Como vamos te chamar"
                            defaultValue={cliente.nome}
                            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                            onBlur={handleNomeBlur}
                        />
                    </div>

                    <div className={style.campo}>
                        <span>Telefone *</span>
                        <InputMask
                            mask="(99) 99999-9999"
                            placeholder="(00) 00000-0000"
                            maskChar=" "
                            value={cliente.telefone}
                            onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                            onBlur={handleTelefoneBlur}
                        />
                    </div>
                </div>
                <div className={style.container_botoes}>
                    <div className={`${style.botao} ${entregaAtiva ? style.ativo : ''}`} onClick={handleEntregaClick} >
                        <img src={moto} alt="icone de moto" />
                        <span>Entrega</span>
                    </div>
                    <div className={`${style.botao} ${retiradaAtiva ? style.ativo : ''}`} onClick={() => { handleRetiradaClick(); setEntregaAtiva(false); }}>
                        <img src={retirada} alt="Icone de retirada" />
                        <span>Retirada</span>
                    </div>
                </div>
                {/* <div className={style.container_endereco}> */}
                <div className={`${style.container_endereco} ${entregaAtiva ? '' : style.hidden}`}>
                    <div className={style.linha1}>
                        <div className={style.input_cep}>
                            <span>Nome da Rua *</span>
                            <input type="text" value={endereco.rua} onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })} />
                        </div>
                    </div>
                    <div className={style.linha2}>
                        <div className={style.input_rua}>
                            <span>CEP</span>
                            <InputMask type='tel' inputMode='numeric' mask="99999-999" placeholder="00000-000" maskChar=" " onChange={handleCepChange} defaultValue={endereco.cep} disabled={!entregaAtiva} />
                        </div>
                    </div>
                    <div className={style.linha3}>
                        <div className={style.input_numero}>
                            <span>Número *</span>
                            <input type="text" disabled={!entregaAtiva} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} />
                        </div>
                        <div className={style.input_complemento}>
                            <span>Complemento</span>
                            <input type="text" disabled={!entregaAtiva} onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div className={style.container_forma_pagamento}>
                    <span className={style.titulo_pagamento}>Forma de Pagamento</span>
                    <div className={style.pagamento}>
                        <div
                            className={`${style.opcao} ${pixAtivo ? style.ativo : ''}`}
                            onClick={handlePixClick}
                        >
                            <span>Pix</span>
                        </div>
                        <div
                            className={`${style.opcao} ${dinheiroAtivo ? style.ativo : ''}`}
                            onClick={handleDinheiroClick}
                        >
                            <span>Dinheiro</span>
                        </div>
                        <div
                            className={`${style.opcao} ${debitoAtivo ? style.ativo : ''}`}
                            onClick={handleDebitoClick}
                        >
                            <span>Débito</span>
                        </div>
                        <div
                            className={`${style.opcao} ${creditoAtivo ? style.ativo : ''}`}
                            onClick={handleCreditoClick}
                        >
                            <span>Crédito</span>
                        </div>
                    </div>
                </div>
                <button className={style.botao_confirmar} onClick={handleConfirmarPedido}>Confirmar Pedido</button>
            </div>
            {modalPix && <Pix onClose={handlePixClose} onConfirmar={handleConfirmarPix} />}
            {modalDinheiro && <Dinheiro onClose={handleDinheiroClose} onConfirmar={troco => handleConfirmarDinheiro(troco)} />}
            {modalResumo && <ResumoPedido pedido={pedido} fechar={handleFecharResumo} />}
            <ToastContainer />
        </>
    );
}

export default Pedido;