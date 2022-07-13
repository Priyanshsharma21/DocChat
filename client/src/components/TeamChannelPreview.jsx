// import React from 'react';
// import { Avatar, useChatContext } from 'stream-chat-react';

// const TeamChannelPreview = ({setActiveChannel, setIsCreating, setIsEditing, channel, type,setToggleContainer}) => {
//   const {channel: activeChannel, client} = useChatContext();

//   const ChannelPreview = ()=>{
//     //show channel name available
//     <p className='channel-preview__item'>
//       #DOAMSS
//     </p>
//   }

//   const DirectPreview = ()=>{
//     //show Direct preview 
//     // this is in form of array contain key as id and it have object [1:{}, 2:{}] to access value we use Object.value
//     // we map through all user and keep id which is equal to clientID 
//     const members = Object.values(channel.state.members).filter(({user})=> user.id !== client.userID)
    
//     return (
//       <div className="channel-preview__item single">
//         <Avatar
//          image={members[0]?.user?.image}
//           name = {members[0]?.user?.fullName}
//           size={24}
//          />
//          <p>{members[0]?.user?.fullName}</p>
//       </div>
//     )
//   }

//   return (
//     <div 
//     className={channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'}
//     onClick={()=>{
//       setIsCreating(false)
//       setIsEditing(false)
//       setActiveChannel(channel);
//       if(setToggleContainer){
//         setToggleContainer((prev)=>!prev)
//       }
//     }}
//     >
//     {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
//     </div>
//   )
// }

// export default TeamChannelPreview

import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );


    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
        console.log(members[0]);

        return (
            <div className="channel-preview__item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }

    return (
        <div
         className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
            
        }
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    );
}

export default TeamChannelPreview