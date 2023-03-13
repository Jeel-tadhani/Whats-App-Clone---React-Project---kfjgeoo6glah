import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import '../styles/App.css';
import ContactList from './ContactList';
import { useValue } from './Context';
import Conversation from './Conversation';

const Container=styled.div`
  display:flex;
  flex-direction:row;
  height:100vh;
  width:100%;
  background:#f8f9fd;
 `
 const PlaceHolder=styled.div`
 flex: 3;
 display: flex;
 justify-content: center;
 flex-direction: column;
 align-items: center;
 font-size: 10px;
 color: rgba(0,0,0,0.45);
 gap: 10px;
 `
const ChatPlaceHolder = styled.img`
width: 240px;
height: 240px;
border-radius: 50%;
object-fit: contain;
`
const PlaceHolderspan = styled.span`
font-size: 32px;
color: #525252;
`
const PlaceHolderP = styled.p`
font-size: 14px;
`
const App = () => {
     const {selectedChat}= useValue();

  return (
    <div id="main">
      <Container>
        <ContactList/>
        {selectedChat?<Conversation/>:
        <PlaceHolder>
          <ChatPlaceHolder src="https://symphonious-hotteok-55edb4.netlify.app/image/welcome-placeholder.jpeg" alt='logo'/>
          <PlaceHolderspan>WhatsApp Web</PlaceHolderspan>
          <PlaceHolderP>WhatsApp connects to your phone to sync messages.</PlaceHolderP>
        </PlaceHolder>}
      </Container>
      
    </div>
  )
}


export default App;
