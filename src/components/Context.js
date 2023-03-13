import React, {createContext, useContext, useState } from 'react';

const arr =[
  [
  {
    id: 1,
    text: "Hey Man 😁",
    senderID: 0,
  },
  {
    id: 2,
    text: "Hey, What's up?",
    senderID: 1,
    addedOn: "12:01 PM",
  },
  {
    id: 3,
    text: "All Good, What about you?",
    senderID: 0,
  },
  {
    id: 4,
    text: "I'm good as well",
    senderID: 1,
  },
  {
    id: 5,
    text: "Great 😁",
    senderID: 0,
  },
  {
    id: 6,
    messageType: "TEXT",
    text: "How is your day?",
    senderID: 1,
  },
  {
    id: 7,
    messageType: "TEXT",
    text: "Awesome as Always",
    senderID: 0,
  }
],
  [{
    id: 1,
    text: "Hey",
    senderID: 0,
  },
  {
    id: 2,
    text: "Hello👋",
    senderID: 1,
    addedOn: "12:01 PM",
  },
  {
    id: 3,
    text: "How are you?",
    senderID: 0,
  },
  {
    id: 4,
    text: "I'm good",
    senderID: 1,
  },
  {
    id: 4,
    text: "What about you?",
    senderID: 1,
  },
  {
    id: 5,
    text: "Great 😁",
    senderID: 0,
  },
  {
    id: 6,
    messageType: "TEXT",
    text: "How OpenAI Goings!",
    senderID: 1,
  }],
]
const arr2 =[{
    id: 1,
    name: "Warren Buffett",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSC5wmmPRWe8Nzov4zuIeRvVwstcIwzmmPWw&usqp=CAU",
    lastText: "How is your day?",
    lastTextTime: "12:58 PM",
    unseenMessage:0
  },
  {
    id: 2,
    name: "Bill Gates",
    profilePic: "https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds",
    lastText: `Awesome as Always`,
    lastTextTime: "12:45 PM",
    unseenMessage:0
  },
  {
    id: 3,
    name: "Elon Musk",
    profilePic: "https://pyxis.nymag.com/v1/imgs/51b/acd/a62a5ea65fec42cc83e77eb5f6c9886223-elon-.rsquare.w700.jpg",
    lastText: "How OpenAI Goings!",
    lastTextTime: "12:30 PM",
    unseenMessage:0
  },
  {
    id: 4,
    name: "Radhakishan Damani",
    profilePic: "data:image/jpeg;base64,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",
    lastText: "Great 😁",
    lastTextTime: "12:00 PM",
    unseenMessage:0
  },
]
const store = createContext();

export const Provider = ({children}) => {
    const [selectedChat,setChat] = useState(false);
    const [messagesList,setMessagesList]=useState(arr);
    const [contactsList,setContactsList]=useState(arr2);
    console.log(contactsList);
    return (
        <store.Provider value={{selectedChat,
                                setChat,
                                messagesList,
                                setMessagesList,
                                contactsList,
                                setContactsList}}>
            {children}
        </store.Provider>
    );
};

export const useValue = () => useContext(store);