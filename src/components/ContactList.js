import React, { useState } from 'react';
import styled from 'styled-components';
import Contact from './Contact';
import { useValue } from './Context';

const Container=styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
flex: 1.6;
`
const ProfileInfo =styled.div`
display: flex;
flex-direction: row;
background: #ededed;
padding: 10px;
`
const ProfileImage =styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
`
const SearchBox = styled.div`
display: flex;
background: #f6f6f6;
padding: 10px;
`
export const SearchContainer = styled.div`
display: flex;
flex-direction: row;
border-radius: 16px;
background: white;
border-radius: 16px;
width: 100%;
padding: 5px 10px;
`
const SearchIcon= styled.img`
width: 28px;
height: 28px;
`
export const SearchInput=styled.input`
width: 100%;
border: none;
outline: none;
font-size: 15px;
margin-left: 10px;
`

const Icons= styled.div`
display: flex;
justify-content: flex-end;
`
const ContactList = () => {
    const {contactsList}=useValue();
    const [search,setsearch]=useState("");
    const [searchlist,setSearchList]=useState([]);

    function handleSearch(e){
        setsearch(e.target.value);
        let list = contactsList.filter(person => {
            return (
              person
              .name
              .toLowerCase()
              .includes(search.toLowerCase()) 
            )})
        setSearchList(list)
        

    }
    // console.log(contactsList);
    return (
        <Container>
            <ProfileInfo>
                <ProfileImage src='https://avatars.githubusercontent.com/u/75013219?v=4'/>
            </ProfileInfo>
            <SearchBox>
                <SearchContainer>
                    <SearchIcon src='https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png'/>
                    <SearchInput onChange={(e)=>handleSearch(e)} placeholder='Search or start new chat'/>
                </SearchContainer>
            </SearchBox>
            {search?
                searchlist.map((item,i) => <Contact key={i} item={item}/>)
                :contactsList.map((item,i) => <Contact key={i} item={item}/>)
            }
            
            
        </Container>
    );
};

export default ContactList;