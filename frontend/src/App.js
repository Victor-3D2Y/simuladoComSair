import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Perfil from './Perfil';
import Main from './Main';
import LoginModal from './LoginModal';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [empresa, setEmpresa] = useState(null);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const handleLoginSuccess = (user) => {
        setUsuarioLogado(user);
    };

    const handleLogout = () => {
        setUsuarioLogado(null);  // Limpa o estado do usuário logado
        window.location.reload(); // Recarrega a página
    };

    useEffect(() => {
        // Busca os dados da empresa ao carregar o componente
        const fetchEmpresa = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/empresa');
                setEmpresa(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados da empresa:', error);
            }
        };
        fetchEmpresa();
    }, []);

    useEffect(() => {
        // Quando o usuário fizer login, vamos buscar a foto dele no banco de dados
        if (usuarioLogado) {
            const fetchFotoUsuario = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/usuarios/${usuarioLogado.id}`);
                    setUsuarioLogado((prev) => ({ ...prev, foto: response.data.foto }));
                } catch (error) {
                    console.error('Erro ao buscar foto do usuário:', error);
                }
            };
            fetchFotoUsuario();
        }
    }, [usuarioLogado]);

    return (
        <div className="App">
            <Header />
            <div id="principal">
                <Perfil 
                    foto={usuarioLogado && usuarioLogado.foto ? usuarioLogado.foto : empresa ? empresa.logo : "default_logo.png"} 
                    nome={usuarioLogado ? usuarioLogado.nome : empresa ? empresa.nome : "FaculHub"} 
                    openLoginModal={openModal}
                    onLogout={handleLogout} // Passa a função de logout para o Perfil
                    usuarioLogado={usuarioLogado}
                />
                <Main 
                    usuarioLogado={usuarioLogado} 
                    openModal={openModal}
                />

                <LoginModal
                    showModal={isModalVisible}
                    closeModal={closeModal}
                    onLoginSuccess={handleLoginSuccess}
                />
            </div>
        </div>
    );
}

export default App;
