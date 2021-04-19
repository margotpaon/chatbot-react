import React from 'react'
import * as yup from 'yup'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import ReactStars from 'react-rating-stars-component'
import './App.css'

// setup chatbot
const configChatBot = {
  width: '30vw',
  height: '75vh',
  floating: true,
}

// style chatbot
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

// validação dos inputs
const validateSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  data: yup
    .date()
    .default(() => new Date())
    .required(),
  cidade: yup.string().required(),
})

// sistema da nota
const ratingChanged = (newRating) => {
  console.log(newRating)
}

// passo a passo do chat
const steps = [
  {
    id: '1',
    message:
      'Olá, eu sou o Chatnilson, tudo bem? Para começarmos, preciso saber seu nome e sobrenome.',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    component: <input type="text" placeholder="Nome e Sobrenome" />,
    trigger: '3',
  },
  {
    id: '3',
    message:
      'Que satisfação, {previousValue}. Agora que sei seu nome, qual a cidade e estado que você mora?',
    trigger: '4',
  },
  {
    id: '4',
    user: true,
    component: <input type="text" placeholder="Cidade, estado" />,
    trigger: '5',
  },
  {
    id: '5',
    message: 'Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu?',
    trigger: '6',
  },
  {
    id: '6',
    user: true,
    component: <input type="text" placeholder="00/00/0000" />,
    trigger: '7',
  },
  { id: '7', message: 'Agora me fala teu e-mail, por gentileza.', trigger: '8' },
  {
    id: '8',
    user: true,
    component: <input type="text" placeholder="email@exemplo.com" />,
    trigger: '9',
  },
  {
    id: '9',
    message:
      'Oba você finalizou o teste. Por favor avalie o processo que realizou até chega aqui. Nós agradecemos!',
    trigger: '10',
  },
  {
    id: '10',
    component: (
      <ReactStars count={5} onChange={ratingChanged} size={24} isHalf activeColor="#ffd700" />
    ),
    trigger: '11',
  },
  { id: '11', component: <button type="submit">Salvar</button>, end: true },
]

function App() {
  return (
    <div className="App">
      <section>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            width={configChatBot.width}
            height={configChatBot.height}
            floating={configChatBot.floating}
          />
        </ThemeProvider>
      </section>
    </div>
  )
}

export default App
