import { useState } from "react";
import ChatMessage from '../ChatMessage';
import '../App.css';

const Home = () =>{
    const [input,setInput] = useState("")
    const [chatlog,setChatlog] = useState([{
      user:"gpt",
      message:"How can I help you?"
    },
    {
      user:"me",
      message:"You need to answer my questions"
    },
  ]);
  
  function clearChat(){
    setChatlog([]);
  }
   
    async function handleSubmit(e){
      e.preventDefault();
       let ChatLogNew =([...chatlog,{user:"me",message:`${input}`}]);
  
      setInput(" ");
      setChatlog(ChatLogNew);
      const messages = ChatLogNew.map((message)=>message.message).join("\n")
      const response = await fetch("http://localhost:4000/",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
    
        body:JSON.stringify({
          message:messages
        })
      });
    
      const data = await response.json();
       setChatlog([...ChatLogNew,{user:"gpt",message:`${data.message}`}]);
      console.log(data);
    
    }
    function handleLog(e){
      setInput(e.target.innerHTML)
    }
    
    return (
      <div className="App">
       <div className='sidemenu'>
          <div className='sidebtn' onClick={clearChat}>
            <h5 className='new'>+ New Chat</h5>   
          </div> 
          <div className='history'>
        {chatlog.map((message,index)=>(
          message.user == "me" &&
          <div key={index} className='previousValues' onClick={handleLog} >
            {message.message}
          </div>
      ))}
        </div>
       </div>
       <div className='mainside'>
        <div className='chatlog'>
        {chatlog.map((message,index)=>(
          <ChatMessage key={index} message={message} />
        ))}  
        </div>
          <div className='chat-input'>
          <form onSubmit={handleSubmit}>
            <input className='chat-prompt' placeholder='Type your message' rows="1" onChange={(e)=>setInput(e.target.value) } value={input} />
            {/* <button type='submit' className='btn'>Submit</button> */}
            </form>
          </div>
       </div>
      </div>
    );
}

export default Home;
