// import './App.css';
// import { StreamChat } from 'stream-chat'
// import { Chat } from 'stream-chat-react'
// import Cookies from 'universal-cookie';
// import {ChannelListContainer,ChannelContainer,Auth} from './components'


// const cookies = new Cookies()

// // stream api key 
// const API_KEY = 'zkd84m7vpg9f';
// //auth token->if we are logedIn we have token else not
// const authToken = cookies.get('token')
// // create instace of stream chat help chat to work 
// const client = StreamChat.getInstance(API_KEY)


// if(authToken){
//   // get all the information  and connect user
//   client.connectUser({
//     id: cookies.get('userId'),
//     name: cookies.get('username'),
//     fullName: cookies.get('fullName'),
//     image: cookies.get('avatarURL'),
//     hashedPassword: cookies.get('hashedPassword'),
//     phoneNumber: cookies.get('phoneNumber'),
//   },authToken) 
// }


// function App() {
//   if(!authToken) return <Auth />
//   return (
//     <div className="app__wrapper">
//         <Chat client={client} theme="team light">
//           <ChannelListContainer/>
//           <ChannelContainer />
//         </Chat>
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import 'stream-chat-react/dist/css/index.css';
// this is for chat style
import './App.css';

const cookies = new Cookies();

const apiKey = 'q9nkhvka7rhg';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}


const App = () => {
    const [createType, setCreateType] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    if(!authToken) return <Auth />

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                />
                <ChannelContainer 
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                createType={createType}
                />
            </Chat>
        </div>
    );
}

export default App;