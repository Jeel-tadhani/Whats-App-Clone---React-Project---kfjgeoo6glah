import EmojiPicker from 'emoji-picker-react';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SearchContainer, SearchInput } from './ContactList';
import { useValue } from './Context';


const Container=styled.div`
display: flex;
flex-direction: column;
height: 100%;
flex:3;
background: #f6f7f8;
`
const ProfileHeader=styled.div`
display: flex;
flex-direction: row;
background: #ededed;
padding: 7px;
align-items: center;
gap: 10px;
border-left: 0.5px solid lightgray;
`
const ProfileImage = styled.img`
width: 38px;
height: 38px;
border-radius: 50%;
`
const Chatbox =styled.div`
display: flex;
background: #f0f0f0;
padding: 10px;
align-items: center;
bottom: 0;
`
const EmojiImage =styled.img`
width: 28px;
height: 28px;
opacity: 0.4;
cursor: pointer;
`
const MessageContainer =styled.div`
display: flex;
flex-direction: column;
height: 100%;
background: #e5ddd6;
overflow-y:auto ;
`
const MassageDiv = styled.div`
justify-content: ${props => props.isYours ? 'flex-end':'flex-start'};
display: flex;
margin: 5px 15px;
`
const Message=styled.div`
background: ${props => props.isYours ? '#daf8cb':'white'};
max-width: 50%;
color:#303030 ;
padding: 8px 10px;
font-size: 14px;
border-radius: 4px;
`
const EmojiContainer = styled.div`
position: absolute;
bottom: 70px;
`


const Conversation = () => {
    const {messagesList,setMessagesList,contactsList,selectedChat,setContactsList}=useValue();
    const inputElement =useRef();
    const [text,setText] = useState("");
    const [emojiVisi,setEmojiVisi] =useState(false);
    const id = (selectedChat==1||selectedChat==2)?1:2; 
    const onEmojiClick = (emojiObj)=>{
        setText(text+emojiObj.emoji);
        setEmojiVisi(false);
        inputElement.current.focus();
    }
    const handleKeyDown =(event)=>{
        if(event.key === "Enter" && text!=""){

            setMessagesList([...messagesList,messagesList[id-1].push({
            id: messagesList[id-1].length+1,
            text: text,
            senderID: (selectedChat<3) ?  (selectedChat==1?0:1):  (selectedChat==3?0:1)})])

            setContactsList(contactsList.map((item,i)=>{
                if((selectedChat<3)?  (selectedChat==1?item.id==2:item.id==1):  (selectedChat==3?item.id==4:item.id==3)){
                    console.log(text);
                    var time = new Date();
                   return {...item,unseenMessage:item.unseenMessage+1,lastText:text,lastTextTime:time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                }else{
                    return item;
                }
            }))

            setText("");     
        }

    }   
    // console.log(selectedChat)
    return (
        <Container>
            <ProfileHeader>
                <ProfileImage src={contactsList[selectedChat-1].profilePic}/>
                {contactsList[selectedChat-1].name}
            </ProfileHeader>
            <MessageContainer className='a'>
                {messagesList[id-1].map((item,i)=>(
                    <MassageDiv key={i}  isYours={selectedChat<3?  selectedChat==1?item.senderID===0:item.senderID===1:  selectedChat==3?item.senderID===0:item.senderID===1}>
                        <Message isYours={selectedChat<3?  selectedChat==1?item.senderID===0:item.senderID===1:  selectedChat==3?item.senderID===0:item.senderID===1}>{item.text}</Message>
                    </MassageDiv>
                ))}
                
            </MessageContainer>
            <Chatbox >
                <SearchContainer >
                    {emojiVisi?<EmojiContainer>
                        <EmojiPicker onEmojiClick={(emoji)=>{onEmojiClick(emoji)}} height='350px' lazyLoadEmojis={true} skinTonesDisabled={true} searchDisabled={true}/>
                    </EmojiContainer>:null}
                    <EmojiImage src='https://cdn-icons-png.flaticon.com/128/876/876781.png' onClick={()=>setEmojiVisi(!emojiVisi)}/>
                    <SearchInput ref={inputElement} onKeyDown={handleKeyDown} placeholder='Type a Message' value={text} onChange={(e)=>setText(e.target.value)}/>
                </SearchContainer>
            </Chatbox>
        </Container>
    );
};

export default Conversation;