function Header() {
    const instagram = "./instagram.webp"
    const twitter = "./twitter.png"
    return (
        <div className='header'>
            <h1>FaculHub – O Curso Certo Para Você</h1>
            <div>
                <img src={instagram} className="imagens" alt="insta" />
                <img src={twitter} className="imagens" alt="twitter" />
            </div>
        </div>

    )
}


export default Header