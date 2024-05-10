import React, { useEffect, useState } from 'react';
import style from './resumo-pedido.module.css';
import user from '../../../assets/profile.svg'
import local from "../../../assets/map-point-svgrepo2.svg"
import money from "../../../assets/money.svg"
const express = require("express");
const req = require("express/lib/request");
const { google } = require("googleapis");

async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client,
    });

    const spreadsheetId = "1i82O3tZOBA5_4hV23Dgu6nQaQUR6c5t1zt0mZtupKV4";

    return {
        auth,
        client,
        googleSheets,
        spreadsheetId,
    };
}

const app = express();
app.use(express.json());

function ResumoPedido({ pedido }) {

    const monospace = "```"
    const whatsapp = "55" + pedido.telefone;
    const mensagemPedido =

`Olá ${pedido.cliente}, recebemos o seu pedido e ele já está sendo preparado!

*Itens:*
${pedido.carrinho.map(item => `
➡ ${item.quantidade}x ${monospace}${item.nome}${monospace} ${item.observacao ? item.observacao : ''}
${monospace}    R$ ${item.preco}${monospace}
`).join('')}
💸 Forma de pagamento - ${pedido.pagamento.forma}${pedido.pagamento.troco ? ` (troco: R$ ${pedido.pagamento.troco})` : ''}

🛵 ${pedido.entrega.forma} (taxa de: R$ ${pedido.entrega.taxa})
🏠 ${pedido.entrega.rua}, Nº ${pedido.entrega.numero}${pedido.entrega.complemento ? ` - ${pedido.entrega.complemento}` : ''}, ${pedido.entrega.bairro}

Total: *R$ ${pedido.valorTotal}*

Obrigado pela preferência, se precisar de algo é só chamar! 😉
`;

    console.log(mensagemPedido);

    console.log(pedido)

    const calcularTotal = () => {
        const total = pedido.carrinho.reduce((acc, item) => {
            return acc + parseFloat(item.preco.replace(',', '.')) * item.quantidade;
        }, 0);

        return total.toFixed(2);
    };

    async function getAuthSheets() {
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        const client = await auth.getClient();

        const googleSheets = google.sheets({
            version: "v4",
            auth: client,
        });

        const spreadsheetId = "1i82O3tZOBA5_4hV23Dgu6nQaQUR6c5t1zt0mZtupKV4";

        return {
            auth,
            client,
            googleSheets,
            spreadsheetId,
        };
    }

    const finalizarPedido = async () => {
        const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message";

        try {
            const response = await fetch(GZAPPY_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    user_token_id: "817ac47a-6d80-4233-b0c6-afda3773726a"
                },
                body: JSON.stringify({
                    instance_id: "MSBDVMULNZ213LNJ0GWCAKA3",
                    instance_token: "a2f897b4-651b-47d0-8a6b-c8cc9f4c0cd7",
                    message: [mensagemPedido],
                    phone: whatsapp
                })
            });

            app.post("/addRow", async (req, res) => {
                const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

                const row = await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Página1",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        pedido,
                    },
                });

                res.send(row.data);
            });

        } catch (error) {
            console.error("Erro ao enviar a mensagem:", error);
        }

        console.log(pedido)

        // sessionStorage.removeItem('cesta');
        // window.location.href = '/';
    };


    return (
        <>
            <div className={style.modal_overlay}>
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
                            <span><b>Troco: </b> {pedido.pagamento.troco}</span>
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
                                    <span>R$ {(parseFloat(item.preco.replace(',', '.')) * item.quantidade).toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>
                        ))}
                        <div className={style.container_item}>
                            <div className={style.item}>
                                <span>Taxa de entrega</span>
                                <span>R$ 0,00</span>
                            </div>
                        </div>
                        <div className={style.total}>
                            <h2>Total</h2>
                            <h2>R$ {calcularTotal().replace('.', ',')}</h2>
                        </div>
                    </div>
                    <button className={style.botao} onClick={finalizarPedido}>Finalizar Pedido</button>
                </div>
            </div>
        </>
    );
};

export default ResumoPedido;