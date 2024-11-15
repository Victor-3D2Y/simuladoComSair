function Postagem({ fotoMain, nomeCurso, instituicao, usuarioLogado, openModal }) {
    const flecha = "./flecha_cima_vazia.svg";
    const chat = "chat.svg";

    const handleClick = () => {
        if (!usuarioLogado) {
            openModal(); // Abre o modal se o usuário não estiver logado
        } else {
            // Aqui você pode adicionar o comportamento para quando o usuário estiver logado
            console.log("Usuário logado - ação permitida");
        }
    };

    return (
        <>
            <div className="titlePubli">
                <p>{nomeCurso}</p>
                <p>{instituicao}</p>
            </div>
            <img src={fotoMain} id="eletromecanica" alt="eletromecanica" />
            <div className="flechaChat">
                <div className="leftMain">
                    <img src={flecha} alt="flecha" onClick={handleClick} />
                    <p>4</p>
                </div>
                <div className="leftMain">
                    <img src={chat} alt="chat" onClick={handleClick} />
                    <p>1</p>
                </div>
            </div>
        </>
    );
}

export default Postagem;
