import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import './App.css';

function App() {
  return (
    <>
     <ChatEngine
      height="100vh"
      projectID= "11a880eb-2922-49ae-9def-260e328ee01a"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
   </>
  );
}

export default App;
