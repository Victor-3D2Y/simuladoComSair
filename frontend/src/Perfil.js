function Perfil({ foto, nome, openLoginModal, onLogout, usuarioLogado }) {
    return (
        <div className="perfil">
            {usuarioLogado ? (
                <>
                    <button onClick={onLogout}>Sair</button>
                    <img src={foto} id="faculHub" alt="Foto de perfil" />
                    <h1>{nome}</h1>
                    <p>Inscrições: 7</p>
                </>
            ) : (
                <>
                    <button onClick={openLoginModal}>Entrar</button>
                    <img src={foto} id="faculHub" alt="Foto de perfil" />
                    <h1>{nome}</h1>
                    <p>Inscrições: 7</p>
                </>
            )}
        </div>
    );
}

export default Perfil;
