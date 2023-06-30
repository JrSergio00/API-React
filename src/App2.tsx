import axios from 'axios'
import './App.css'
import { useState } from "react";

const api = axios.create({
  baseURL: "https://infoweb-api.vercel.app/",
})

const AppNavBar = (props: any) => {
  return (
    <>
      <h1>Unidades Federativas do Brasil</h1>
      <h2>Requisição à uma Api</h2>
      <button onClick={props.onClick}>Buscar UF's</button>
    </>
  )
}

const AppCard = (props: any) =>{
  return (
    <div className='Card'>
      <h3>{props.sigla}</h3>
      <p>{props.nome}</p>
    </div>
  )
}

const App = () => {
  const [ufs, setUfs] = useState([])
  const onClick = () => {
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
      <AppNavBar onClick={onClick}/>

      <main>
        {ufs.map((uf: any, indice: number) => (
            <AppCard key={indice} sigla={uf.sigla} nome={uf.nome}/>
          ))}
      </main>
    </>
  )
}


export default App
