const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const configuration = new Configuration({
  apiKey: 'VOTRE_CLE_API_OPENAI', // Remplacez par votre clé API
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: message,
    max_tokens: 150,
  });

  res.json({ reply: response.data.choices[0].text });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
