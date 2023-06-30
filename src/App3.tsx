import { useState } from 'react'
import './App.css'
import axios from "axios"

const AppNavBar = () => {
  return (
    <>
      <h1>Unidades Federativas do Brasil</h1>
      <h2>Requisição à uma Api</h2>
    </>
  )
}
const AppUfLista = (props: any) => {
  return(
    <>
      <ul>
        {props.ufs.map( (item: any) => (
          <li key={item.id} onClick={item.sigla} >{item.sigla}</li>
        ) )}
      </ul>
    </>
  )
}

const AppUfDetalhe = (props: any) => {

  return(
    <>
      <h2>{props.sigla}</h2>
      <p>{props.nome}</p>
      <button onClick={props.carregarUfs}>Carregar UFs</button>
    </>
  )
}

const App = () => {
  const [uf] = useState([
    {
      sigla: "RN",
      nome: "Rio Grande do Norte"
    },
    {
      sigla: "AL",
      nome: "Alagoas"
    },
    {
      sigla: "BA",
      nome: "Bahia"
    },
    {
      sigla: "PE",
      nome: "Pernambuco"
    },
    {
      sigla: "CE",
      nome: "Ceará"
    },
  ])

  const [ufs, setUfs] = useState([])

  const api = axios.create({
    baseURL: "https://infoweb-api.vercel.app/",
  })

  const carregarUfs = () => {
    api.get("uf").then(
      (resposta) => {
        console.info(resposta.data.data)
        const listaUf = resposta.data.data
        setUfs(listaUf)
      }
    );
  }
  
  return (
    <>
      <AppNavBar />

      <AppUfLista ufs={ufs}/>

      {uf.map( (item: any, indice: number) => (
        <AppUfDetalhe key={indice} sigla={item.sigla} nome={item.nome} carregarUfs={carregarUfs}/>
      ) )}
    </>
  )
}

export default App