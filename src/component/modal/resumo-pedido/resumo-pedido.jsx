import React, { useState } from 'react';
import style from './resumo-pedido.module.css';
import user from '../../../assets/profile.svg'
import local from "../../../assets/map-point-svgrepo2.svg"
import money from "../../../assets/money.svg"
import BarraDeProgresso from '../../barra-progresso/barra-progresso';

function ResumoPedido({ pedido, fechar }) {
    const [progresso, setProgresso] = useState(0)
    const [mensagemProgresso, setMensagemProgresso] = useState('')
    const [barraProgresso, setBarraProgresso] = useState(false)

    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            fechar();
        }
    };

    function calcularValorTotal(pedido) {
        if (!pedido || !pedido.carrinho || !Array.isArray(pedido.carrinho)) {
            return 0;
        }

        let valorTotal = 0;

        pedido.carrinho.forEach(item => {
            const precoItem = parseFloat(item.preco);
            valorTotal += precoItem * item.quantidade;
        });

        return valorTotal += pedido.entrega.taxa;
    }

    const valorTotal = calcularValorTotal(pedido).toFixed(2).replace('.', ',');
    const monospace = "```"
    const whatsapp = "55" + pedido.telefone;

    function renderizaFormaPagamentoEmoji(formaPagamento) {
        switch (formaPagamento) {
            case 'Credito':
                return '💳';
            case 'Débito':
                return '💳';
            case 'Dinheiro':
                return '💵';
            case 'Pix':
                return '📱💵';
            default:
                return '';
        }
    }

    const formaPagamentoEmoji = renderizaFormaPagamentoEmoji(pedido.pagamento.forma);

    const mensagem = `Olá ${pedido.cliente}, recebemos o seu pedido e ele já está sendo preparado!

*Itens:*
${pedido.carrinho.map(item => `
➡ ${item.quantidade}x ${monospace}${item.nome}${monospace}
${monospace}    R$ ${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}${monospace} ${item.observacao ? ` ${monospace}(${item.observacao})${monospace}` : ''}`).join('')}

${formaPagamentoEmoji} ${pedido.pagamento.forma}${pedido.pagamento.troco ? ` (troco: R$ ${parseFloat(pedido.pagamento.troco).toFixed(2).replace('.', ',')})` : ''}

🛵 ${pedido.entrega.forma} (taxa de entrega: R$ ${pedido.entrega.taxa.toFixed(2).replace('.', ',')})
🏠 ${pedido.entrega.rua}, Nº ${pedido.entrega.numero}${pedido.entrega.complemento ? ` - ${pedido.entrega.complemento}` : ''}, ${pedido.entrega.bairro}

Total: *R$ ${calcularValorTotal(pedido).toFixed(2).replace('.', ',')}*

Obrigado pela preferência, se precisar de algo é só chamar! 😉`;

    const enviarDados = () => {
        const carrinhoFormatado = pedido.carrinho
            .map(
                (item) =>
                    `${item.quantidade}x ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}${item.observacao ? ` (${item.observacao})` : ""}`
            ).join("\n")

        return (fetch('https://sheetdb.io/api/v1/yt20l2qti41d5', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('nhfmr45f:7r7fz6q3zxsy0vk1u3q6')
            },
            body: JSON.stringify({
                data: [
                    {
                        'ID': "INCREMENT",
                        'Data': pedido.dataHora,
                        'Cliente': pedido.cliente,
                        'Telefone': pedido.telefone,
                        'Carrinho': carrinhoFormatado,
                        'Taxa de Entrega': pedido.entrega.taxa,
                        'Forma de Entrega': pedido.entrega.forma,
                        'Endereço': `${pedido.entrega.rua}, ${pedido.entrega.numero} ${pedido.entrega.complemento ? `${pedido.entrega.complemento}` : ''} - ${pedido.entrega.bairro}`,
                        'Forma de pagamento': pedido.pagamento.forma,
                        'Troco': pedido.pagamento.troco,
                        'Total': valorTotal
                    }
                ]
            })
        }))
            .then((response) => response.json())
            .catch(error => {
                console.error('Erro ao enviar dados para a planilha: ', error)
                throw error;
            })
    };

    const enviarMensagem = () => {
        try {
            //return (fetch('https://api.gzappy.com/v1/message/send-message', { // Conta Rafael
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         user_token_id: "817ac47a-6d80-4233-b0c6-afda3773726a"
            //     },
            //     body: JSON.stringify({
            //         instance_id: "NWQ5H21BO0PPFUOCRD64DF8X",
            //         instance_token: "40e606f8-b73d-40b0-b39d-83d56f24a4ce",
            //         message: [mensagem],
            //         phone: whatsapp
            //     })
            // });

            return (fetch('https://api.gzappy.com/v1/message/send-message', { // Conta Karina
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    user_token_id: "1211f4e0-26a4-41e0-8309-730ce983f7f8"
                },
                body: JSON.stringify({
                    instance_id: "EPWPVNW4677DJYTZDZOLO4ER",
                    instance_token: "21107b1c-5735-4eb0-ab3c-588f28e95c13",
                    message: [mensagem],
                    phone: whatsapp
                })
            }));

        } catch (error) {
            console.error("Erro ao enviar a mensagem:", error);
        }
    }

    const finalizarPedido = async () => {
        setBarraProgresso(true)
        try {
            setProgresso(0)
            setMensagemProgresso("Confirmando seu pedido...")

            await enviarDados();
            setProgresso(30)
            setMensagemProgresso("Enviando seu pedido para a cozinha...")

            await enviarMensagem();
            setProgresso(60)
            setMensagemProgresso("Seu pedido está na fila de preparo!")

            sessionStorage.clear();
            setProgresso(80)
            setMensagemProgresso("Cozinha a todo vapor!")

            setProgresso(100)
            setMensagemProgresso("Pedido finalizado com sucesso!")

            window.location.href = '/';

        } catch (error) {
            console.error("Erro ao finalizar o pedido: ", error)
        }
    };

    return (
        <>
            <div className={style.modal_overlay} onClick={handleModalClick} >
                <div className={style.modal}>
                    <h1>Resumo do Pedido:</h1>
                    <div className={style.container_info}>
                        <div className={style.container_titulo}>
                            <img src={user} alt="" className={style.icon} />
                            <h2>Cliente</h2>
                        </div>
                        <span><b>Nome: </b>{pedido.cliente}</span>
                        <span><b>Telefone: </b>{pedido.telefone}</span>
                    </div>

                    <div className={style.container_info}>
                        <div className={style.container_titulo}>
                            <img src={local} alt="" className={style.icon} />
                            <h2>{pedido.entrega.forma}</h2>
                        </div>
                        <span>
                            <b>Endereço: </b>
                            {pedido.entrega.rua}, {pedido.entrega.numero}{pedido.entrega.complemento && `, ${pedido.entrega.complemento}`} - {pedido.entrega.bairro}
                        </span>
                    </div>
                    <div className={style.container_info}>
                        <div className={style.container_titulo}>
                            <img src={money} alt="" className={style.icon} />
                            <h2>Pagamento</h2>
                        </div>
                        <span><b>Forma: </b>{pedido.pagamento.forma}</span>
                        {pedido.pagamento.troco > 0 && (
                            <span><b>Troco: </b> R$ {parseFloat(pedido.pagamento.troco).toFixed(2).replace('.', ',')}</span>
                        )}
                    </div>
                    <div className={style.container_itens}>
                        <div className={style.itens_preco}>
                            <h2>Itens</h2>
                            <h2>Preço</h2>
                        </div>
                        {pedido.carrinho.map((item, index) => (
                            <div key={index} className={style.container_item}>
                                <div className={style.item}>
                                    <span>
                                        <b>{item.quantidade}×</b> {item.nome}
                                    </span>
                                    <span>R$ {(parseFloat(item.preco) * item.quantidade).toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>
                        ))}
                        <div className={style.container_item}>
                            <div className={style.item}>
                                <span>Taxa de entrega</span>
                                <span>R$ {pedido.entrega.taxa.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>
                        <div className={style.total}>
                            <h2>Total</h2>
                            <h2>R$ {valorTotal}</h2>
                        </div>
                    </div>
                    <button className={style.botao} onClick={finalizarPedido}>Finalizar Pedido</button>
                </div>
            </div>
            {barraProgresso && <BarraDeProgresso progresso={progresso} mensagem={mensagemProgresso} />}
        </>
    );
};

export default ResumoPedido;