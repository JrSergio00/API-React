import { useState } from 'react'
import './App.css'
import axios from "axios"

const AppNavBar = (props: any) => {
  return (
    <header>
      <h1>Unidades Federativas do Brasil</h1>
      <h2>Requisição à uma Api</h2>
      <button onClick={props.carregarUfs}>Carregar UFs</button>
    </header>
  )
}
const AppUfDetalhe = (props: any) => {
  return(
    <section>
      <h2>{props.sigla}</h2>
      <p>{props.nome}</p>
    </section>
  )
}
const AppUfLista = (props: any) => {
  return(
    <>
      <ul>
        {props.ufs.map( (item: any) => (
          <li key={item.id} onClick={ () => props.detalhar(item.sigla)}>
            {item.sigla}
          </li>
        ))}
      </ul>
    </>
  )
}


const App = () => {
  const [uf, setUf] = useState({
    nome: "Nome da UF",
    sigla: "Sigla da UF"
  })
  const [ufs, setUfs] = useState([])
  const api = axios.create({
    baseURL: "https://infoweb-api.vercel.app/",
  })

  const carregarUfs = () => {
    api.get("uf").then(
      (resposta) => {
        const listaUfs = resposta.data.data
        setUfs(listaUfs)
      }
    );
  }
  const detalhar = (sigla: any) =>{
    api.get(`uf/${sigla}`).then(
      (resposta) => {
        console.log("AAA")
        // const UfNome = resposta.data.data[0].nome
        // const UfSigla = resposta.data.data[0].sigla
        const Uf = resposta.data.data[0]
        // const Uf = {
        //   nome: UfNome,
        //   sigla: UfSigla
        // }
        console.log(Uf)
        setUf(Uf)
      }
    );
  }
  
  return (
    <>
      <AppNavBar carregarUfs={carregarUfs}/>
      
      <AppUfDetalhe sigla={uf.sigla} nome={uf.nome}/>

      <AppUfLista ufs={ufs} detalhar={detalhar}/>

    </>
  )
}

export default App