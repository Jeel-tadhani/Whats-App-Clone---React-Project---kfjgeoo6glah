import React from 'react';
import styled from 'styled-components';
import { useValue } from './Context';

const Container =styled.div`
display: flex;
flex-direction: row;
border-bottom: 1px solid #f2f2f2;
background:white;
cursor: pointer;
padding:15px 12px ;
:hover{
    background: #ebebeb;
}
`
const ProfileIcon=styled.img`
width: 38px;
height: 38px;
border-radius: 50%;
`
const ContactInfo=styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin: 0 12px;

`
const ContactName=styled.span`
width: 100%;
font-size: 16px;
color:black;
`
const MassageText=styled.span`
width: 100%;
font-size: 14px;
margin-top: 3px;
color: rgba(0,0,0,0.8);
`
const MassageTime=styled.span`
font-size: 12px;
margin-right:10px ;
color: rgba(0,0,0,0.45);
white-space: nowrap;
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 5px;
`
const UnseenContainer =styled.div`
 background-color: rgb(37,211,102);
 color: white;
 width: 17px;
 height: 17px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
`

const Contact = ({item}) => {
    const {setChat,contactsList,setContactsList} = useValue();
    function handleClick(){
        setChat(item.id)
        setContactsList(contactsList.map((data)=>{
            if(data.id === item.id){
               return {...data,unseenMessage:0}
            }else{
                return data;
            }
        }))
        console.log(item.id);
    }
    var time = new Date();
    return (
        <Container onClick={handleClick}>
            <ProfileIcon src={item.profilePic} alt="picture"/>
            <ContactInfo>
                <ContactName>{item.name}</ContactName>
                <MassageText>{item.lastText}</MassageText>
            </ContactInfo>
            <MassageTime>{item.lastTextTime}
            {item.unseenMessage==0?null:
            <UnseenContainer>{item.unseenMessage}</UnseenContainer>}
            </MassageTime>
            
        </Container>
    );
};

export default Contact;