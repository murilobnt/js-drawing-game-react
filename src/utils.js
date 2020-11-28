
function connectToWS(HOST, _onopen, _onmessage){
  let ws = new WebSocket(HOST);

  ws.onopen = _onopen;
  ws.onmessage = _onmessage;

  return ws;
}

export {connectToWS};
