class ServerConnector {
  constructor(){
    let HOST = window.location.origin.replace(/^http/, 'ws').replace(/:3000/, ':30000')
    this.ws = new WebSocket(HOST);
  }

  sendMessage(message){
    if(this.unlocked){
      this.ws.send('message', message);
    }
  }

  startListening(callback){
    this.ws.onmessage = callback;
  }
}

export default ServerConnector;
