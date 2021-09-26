const MessageList=document.querySelector("ul");
const MessageForm=document.querySelector("#message");
const nickForm=document.querySelector("#nick");

const socket = new WebSocket(`ws://${window.location.host}`);


function makeMessage(type,payload){
  const msg={type,payload}
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  const li =document.createElement("li");
  li.innerText=message.data;
  MessageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function handleSubmit(event){
    event.preventDefault();
    const input =MessageForm.querySelector("input");
    socket.send(makeMessage("new_message",input.value));
    const li =document.createElement("li");
    li.innerText=`you: ${input.value}`;
    MessageList.append(li);
    input.value="";
}

function handleNickSubmit(event){
  event.preventDefault();
  const input =nickForm.querySelector("input");
  socket.send(makeMessage("nickname",input.value));
  input.value="";

}
MessageForm.addEventListener("submit",handleSubmit);
nickForm.addEventListener("submit",handleNickSubmit);
