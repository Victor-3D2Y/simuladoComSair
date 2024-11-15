import React, { useState, useEffect } from 'react';
import Postagem from './Postagem';
import axios from 'axios';

function Main({ usuarioLogado, openModal }) {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        // Busca os cursos ao carregar o componente
        const fetchCursos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/cursos');
                setCursos(response.data);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            }
        };
        fetchCursos();
    }, []);

    return (
        <div id="tudo">
            <h2>Cursos</h2>
            {cursos.map((curso) => (
                <Postagem
                    key={curso.id_curso}
                    nomeCurso={curso.nome_curso}
                    fotoMain={curso.foto} // Pega a foto do curso do banco de dados
                    instituicao={curso.instituicao} // Pega a instituição do banco de dados
                    usuarioLogado={usuarioLogado}
                    openModal={openModal}
                />
            ))}
        </div>
    );
}

export default Main;
