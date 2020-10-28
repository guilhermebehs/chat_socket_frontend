import React, { useState, useEffect, Component } from "react";
import socketIOClient from "socket.io-client";
import './App.css';



class App extends Component {

  constructor(props){
    super(props)
    this.state={
      mensagens:[],
      texto:'',
      socket: socketIOClient('localhost:3001')
    }

    this.state.socket.on("broadcast", data => {
      this.setState({mensagens:data})
    });
               
    this.state.socket.on("atualizarMensagens", data => {
      this.setState({mensagens:data})
    });
  }


  onButtonClick(socket){
  
    socket.emit('enviarMensagem',this.state.texto);
  };

  gerarConversa(){

    const conversa = this.state.mensagens.map((mensagem)=>
       <div>
          {mensagem.usuario}<br/>
          {mensagem.dataHora}  -  {mensagem.texto} 
          <br/>
          <br/>
      </div>
         
    )

    return conversa;
  }

  render(){
  return (
    <div className="App">
        <input type="text"  onChange={e=>{this.setState({texto:e.target.value})}}/>
        <button  onClick={()=>this.onButtonClick(this.state.socket)}>Enviar Mensagem</button>
        <br/>
        <br/>
        
        {this.gerarConversa()}

    </div>
  );
  }
}

export default App;
