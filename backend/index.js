const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

// Configuração do banco de dados
const sequelize = new Sequelize('saep', 'root', 'admin', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

// Definindo os modelos
const Curso = sequelize.define('curso', {
    id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    foto: Sequelize.TEXT,
    nome_curso: Sequelize.TEXT,
    instituicao: Sequelize.TEXT,
    empresa_id: Sequelize.INTEGER
}, { freezeTableName: true, timestamps: false });

const Empresa = sequelize.define('empresa', {
    id_empresa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: Sequelize.TEXT,
    logo: Sequelize.TEXT
}, { freezeTableName: true, timestamps: false });

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: Sequelize.TEXT,
    email: Sequelize.TEXT,
    nickname: Sequelize.TEXT,
    senha: Sequelize.INTEGER,
    foto: Sequelize.TEXT,
    createdAt: Sequelize.TEXT,
    updatedAt: Sequelize.TEXT
}, { freezeTableName: true, timestamps: false });

// Inicializando o app Express
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rota para listar usuários
app.get('/api/usuarios', async (req, res) => {
    try {
        const listaUsuarios = await Usuario.findAll();
        res.json(listaUsuarios);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ error: "Erro ao listar usuários" });
    }
});

// Rota de login
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email, senha } });
        if (usuario) {
            res.json({ success: true, user: usuario });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});
// Rota para obter dados da empresa
app.get('/api/empresa', async (req, res) => {
    try {
        const empresa = await Empresa.findOne(); // busca a primeira empresa
        res.json(empresa);
    } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
        res.status(500).json({ error: "Erro ao buscar dados da empresa" });
    }
});
// Rota para obter cursos
app.get('/api/cursos', async (req, res) => {
    try {
        const cursos = await Curso.findAll(); // Obtém todos os cursos
        res.json(cursos);
    } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        res.status(500).json({ error: "Erro ao buscar cursos" });
    }
});
// Rota para obter dados de um usuário específico
app.get('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id); // Busca um usuário pelo ID
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
});



// Conexão com o banco de dados e sincronização dos modelos
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();
