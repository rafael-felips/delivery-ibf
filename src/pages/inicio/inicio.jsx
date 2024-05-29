import React, { useEffect, useState } from 'react';
import style from './inicio.module.css'
import perfil from '../../assets/logo.png'
import whatsapp from '../../assets/whatsapp.svg'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function Inicio() {
    const [infos, setInfos] = useState([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        sessionStorage.clear()
        const fetchData = async () => {
            try {
                const response = await axios.get('https://script.google.com/macros/s/AKfycbwHNN1j6cOpRmBoMC7nFPfTBbl8625lknKbbB0D7e61DxmyzdBhBEGKElAaMlMZO-WT2A/exec');
                setInfos(response.data);
            } catch (error) {
                console.error('Houve um problema com a requisição axios:', error.message);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, []);


    const fechado = (() => {
        toast.error('Fechado.', { autoClose: 3000 });
    })

    return (
        <>
            <div className={style.corpo}>
                <div className={style.perfil}>
                    <div className={style.foto_perfil}>
                        <img src={perfil} alt="foto de perfil" />
                    </div>
                    <h1>Delivery Igreja Batista</h1>
                </div>
                {carregando ?
                    <svg className={style.loading} viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                    :
                    (<>
                        {
                            infos.Aberto ?
                                <span className={style.funcionamento_aberto}>Aberto até as 14h</span>
                                :
                                <span className={style.funcionamento_fechado}>Fechado</span>
                        }
                        {infos.Aberto ?
                            <button className={style.botao} onClick={() => window.location.href = '/cardapio'}>Iniciar Pedido</button>
                            :
                            <button className={style.botao} onClick={fechado}>Iniciar Pedido</button>
                        }
                    </>)
                }
            </div>
            <a href="https://wa.me/5511981910988" target="_blank" >
                <img src={whatsapp} className={style.whatsapp} alt="Icone de WhatsApp" />
            </a>
            <ToastContainer />
        </>
    );
};

export default Inicio;