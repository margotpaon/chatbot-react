import React from 'react'
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
  fontFamily: 'Tahoma',
  headerBgColor: '#61dafb',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#61dafb',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

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
    validator: (value) => {
      const regExNumbers = /[^\d]/ // somente numeros
      const regExNoSpace = /^\s+|\s+$/g // retira espaço em branco

      if (value.length !== 10) {
        return 'data invalida, digite assim 12/09/1970'
      }

      const splitData = value.split('/')

      if (splitData.length !== 3) {
        return false
      }

      /* Retira os espaços em branco do início e fim de cada string. */
      splitData[0] = splitData[0].replace(regExNoSpace, '')
      splitData[1] = splitData[1].replace(regExNoSpace, '')
      splitData[2] = splitData[2].replace(regExNoSpace, '')

      if (splitData[0].length !== 2 || splitData[1].length !== 2 || splitData[2].length !== 4) {
        return false
      }

      /* Procura por caracter não-numérico. EX.: o "x" em "28/09/2x11" */
      if (
        regExNumbers.test(splitData[0]) ||
        regExNumbers.test(splitData[1]) ||
        regExNumbers.test(splitData[2])
      ) {
        return false
      }

      const day = parseInt(splitData[0], 10)
      const month = parseInt(splitData[1], 10) - 1 // O JavaScript representa o mês de 0 a 11 (0->janeiro, 1->fevereiro... 11->dezembro)
      const year = parseInt(splitData[2], 10)
      const newData = new Date(year, month, day)
      const today = new Date()

      if (newData > today) {
        return false
      }

      if (
        newData.getDate() !== day ||
        newData.getMonth() !== month ||
        newData.getFullYear() !== year
      ) {
        return false
      }
      return true
    },
    trigger: '7',
  },
  { id: '7', message: 'Agora me fala teu e-mail, por gentileza.', trigger: '8' },
  {
    id: '8',
    user: true,
    validator: (value) => {
      const user = value.substring(0, value.indexOf('@'))
      const domain = value.substring(value.indexOf('@') + 1, value.length)

      if (
        user.length >= 1 &&
        domain.length >= 1 &&
        user.search('@') === -1 &&
        domain.search('@') === -1 &&
        user.search(' ') === -1 &&
        domain.search(' ') === -1 &&
        domain.search('.') !== -1 &&
        domain.indexOf('.') >= 1 &&
        domain.lastIndexOf('.') < domain.length - 1
      ) {
        console.log('email valido')
      } else {
        return 'Digite um email válido nome@nome.com'
      }
      return true
    },
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
