const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const configuration = new Configuration({
  apiKey: 'sk-proj-t461UD2G1cRQbEupryhWT3BlbkFJaHe2Jy8QqhZp8lVPOLLY', 
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
