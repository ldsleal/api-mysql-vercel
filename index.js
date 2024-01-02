require('dotenv').config();
const mysql= require('mysql');

const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando n porta ${port}`);
  });


  // Exemplo de rota para consultar dados
app.get('/usuar', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM usuar');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/batimentos_cardiacos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM batimentos_cardiacos');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/passos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM passos');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/distancia', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM distancia');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/respiracao', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM respiracao');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/oxigenacao', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM oxigenacao');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/peso', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM peso');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});

app.get('/sono', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM sono');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Erro " + err);
  }
});



// Endpoint para criar um novo USUAR
app.post('/usuar', async (req, res) => {
  try {
      const { nome, email } = req.body;
      
      // Insere dados na tabela usuar
      const result = await pool.query(
          'INSERT INTO usuar (nome, email) VALUES ($1, $2) RETURNING *', 
          [nome, email]
      );

      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});

// Endpoint para criar um novo batimento
app.post('/batimentos_cardiacos', async (req, res) => {
  try {
      const {id_pessoa, valor, dia, horario} = req.body;
      
      // Insere dados na tabela batimentos_cardiacos
      const result = await pool.query(
          'INSERT INTO batimentos_cardiacos (id_pessoa, valor, dia, horario) VALUES ($1, $2 , $3, $4) RETURNING *', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result.rows[0]);
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
          'INSERT INTO public.distancia (id_pessoa, valor, dia, horario) VALUES ($1, $2, $3, $4) RETURNING *', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result.rows[0]);
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
          'INSERT INTO public.passos (id_pessoa, valor, dia) VALUES ($1, $2, $3) RETURNING *', 
          [id_pessoa, valor, dia]
      );

      res.status(201).json(result.rows[0]);
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
          'INSERT INTO public.respiracao (id_pessoa, valor, dia, horario) VALUES ($1, $2, $3, $4) RETURNING *', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result.rows[0]);
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
          'INSERT INTO public.oxigenacao (id_pessoa, valor, dia, horario) VALUES ($1, $2, $3, $4) RETURNING *', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result.rows[0]);
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
          'INSERT INTO public.peso (id_pessoa, valor, dia, horario) VALUES ($1, $2, $3, $4) RETURNING *', 
          [id_pessoa, valor, dia, horario]
      );

      res.status(201).json(result.rows[0]);
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
          'INSERT INTO public.sono (id_pessoa, duracao, start_date, end_date, start_time , end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
          [id_pessoa, duracao, start_date, end_date, start_time, end_time]
      );

      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error('Erro ao inserir no banco de dados', error);
      res.status(500).send('Erro interno do servidor');
  }
});