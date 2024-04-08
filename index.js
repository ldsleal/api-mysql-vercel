require('dotenv').config();
const mysql = require('mysql2');

const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const pool = require("./database")

app.listen(port, () => {
    console.log(`Servidor rodando n porta ${port}`);
  });

app.get('/', (req, res) => {

    res.send('Your Express API is up and running!');
    
});

  // Exemplo de rota para consultar dados
app.get('/pessoa', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const result = await pool.query('SELECT * FROM pessoa');
        res.json(result[0]); // result[0] contém as linhas retornadas
        connection.release(); // Liberando a conexão de volta para o pool
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro " + err);
    }
});

app.get('/batimentos_cardiacos', async (req, res) => {
  try {
    const connection =  await pool.getConnection();
    const result = await pool.query('SELECT * FROM batimentos_cardiacos');
    res.json(result[0]);
    connection.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/passos', async (req, res) => {
  try {
    const connection =  await pool.getConnection();
    const result = await pool.query('SELECT * FROM passos');
    res.json(result[0]);
    connection.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/distancia', async (req, res) => {
  try {
    const connection =  await pool.getConnection();
    const result = await pool.query('SELECT * FROM distancia');
    res.json(result[0]);
    connection.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/respiracao', async (req, res) => {
  try {
    const connection =  await pool.getConnection();
    const result = await pool.query('SELECT * FROM respiracao');
    res.json(result[0]);
    connection.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/oxigenacao', async (req, res) => {
  try {
    const connection =  await pool.getConnection();
    const result = await pool.query('SELECT * FROM oxigenacao');
    res.json(result[0]);
    connection.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/peso', async (req, res) => {
  try {
    const connection =  await pool.getConnection();
    const result = await pool.query('SELECT * FROM peso');
    res.json(result[0]);
    connection.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/sono', async (req, res) => {
  try {
    const connection =  await pool.getConnection();
    const result = await pool.query('SELECT * FROM sono');
    res.json(result[0]);
    connection.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});


// Exemplo de rota para autenticação de login
app.post('/login', async (req, res) => {
  try {
      const {username, password} = req.body; // Recebendo os dados de login do corpo da solicitação
      
      const connection = await pool.getConnection();
      const [rows] = await pool.query('SELECT * FROM pessoa WHERE  username = ? AND password = ? ',  [username, password]); // Consulta para verificar as credenciais

      if (rows.length > 0) {
          res.status(200).json({ message: "Login bem-sucedido" }); // Retornando uma resposta indicando que o login foi bem-sucedido
      } else {
          res.status(401).json({ message: "Credenciais inválidas" }); // Retornando uma resposta indicando que as credenciais são inválidas
      }
      
      connection.release(); // Liberando a conexão de volta para o pool
  } catch (err) {
      console.error(err);
      res.status(500).send("Erro " + err);
  }
});


app.post('/cadastro', async (req, res) => {
  try {
    const { nome, username, password, cpf, nascimento } = req.body;

    // Primeiro, verifica se o username ou cpf já existe na tabela pessoa
    const checkUser = await pool.query(
      'SELECT * FROM pessoa WHERE username = ? OR cpf = ?',
      [username, cpf]
    );

    // Se já existir um usuário com o mesmo username ou cpf, retorna um erro
    if (checkUser[0].length > 0) {
      return res.status(409).send('Usuário já existe.');
    }

    // Insere os dados na tabela pessoa se não houver conflito
    const result = await pool.query(
      'INSERT INTO pessoa (nome, username, password, cpf, nascimento) VALUES (?, ?, ?, ?, ?)',
      [nome, username, password, cpf, nascimento]
    );

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Erro ao inserir no banco de dados', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Endpoint para criar um novos sono
app.post('/batimentos_cardiacos', async (req, res) => {
  try {
      const {id_pessoa, valor, dia, horario} = req.body;
      
      // Insere dados na tabela sono
      const result = await pool.query(
          'INSERT INTO batimentos_cardiacos (id_pessoa, valor, dia, horario) VALUES (?, ?, ?, ?)', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});


// Endpoint para criar um novos sono
app.post('/distancia', async (req, res) => {
  try {
      const {id_pessoa, valor, dia, horario} = req.body;
      
      // Insere dados na tabela sono
      const result = await pool.query(
          'INSERT INTO distancia (id_pessoa, valor, dia, horario) VALUES (?, ?, ?, ?)', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});

// Endpoint para criar um novos passos
app.post('/passos', async (req, res) => {
  try {
      const {id_pessoa, valor, dia} = req.body;
      
      // Insere dados na tabela batimentos_cardiacos
      const result = await pool.query(
          'INSERT INTO passos (id_pessoa, valor, dia) VALUES (?, ?, ?)', 
          [id_pessoa, valor, dia]
      );

      res.status(201).json(result[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});

// Endpoint para criar um novos respiracao
app.post('/respiracao', async (req, res) => {
  try {
      const {id_pessoa, valor, dia, horario} = req.body;
      
      // Insere dados na tabela batimentos_cardiacos
      const result = await pool.query(
          'INSERT INTO respiracao (id_pessoa, valor, dia, horario) VALUES (?, ?, ?, ?)', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});

// Endpoint para criar um novos oxigenacao
app.post('/oxigenacao', async (req, res) => {
  try {
      const {id_pessoa, valor, dia, horario} = req.body;
      
      // Insere dados na tabela batimentos_cardiacos
      const result = await pool.query(
          'INSERT INTO oxigenacao (id_pessoa, valor, dia, horario) VALUES (?, ?, ?, ?)', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});

// Endpoint para criar um novos peso
app.post('/peso', async (req, res) => {
  try {
      const {id_pessoa, valor, dia, horario} = req.body;
      
      // Insere dados na tabela peso
      const result = await pool.query(
          'INSERT INTO peso (id_pessoa, valor, dia, horario) VALUES (?, ?, ?, ?) ', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});

// Endpoint para criar um novos sono
app.post('/sono', async (req, res) => {
  try {
      const {id_pessoa, duracao, start_date, end_date, start_time, end_time} = req.body;
      
      // Insere dados na tabela sono
      const result = await pool.query(
          'INSERT INTO sono (id_pessoa, duracao, start_date, end_date, start_time , end_time) VALUES (?, ?, ?, ?, ?, ?)', 
          [id_pessoa, duracao, start_date, end_date, start_time, end_time]
      );

      res.status(201).json(result[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});

