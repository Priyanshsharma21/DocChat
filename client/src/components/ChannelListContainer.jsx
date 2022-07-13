// //!show all the list of channels
// import React, { useState } from 'react';
// import { ChannelList, useChatContext } from 'stream-chat-react';
// import Cookies from 'universal-cookie';

// import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
// import HospitalIcon from '../assets/hospital.png'
// import LogoutIcon from '../assets/logout.png'

// const cookies = new Cookies();

// const Sidebar = ({logout})=>{
//     return(
//         <>
//     <div className="channel-list__sidebar">
//         {/* //hospital icon  */}
//         <div className="channel-list__sidebar__icon1">
//             <div className="icon1__inner">
//                 <img src={HospitalIcon} alt="hospital icon" width='30' />
//             </div>
//         </div>
//         {/* logout icon  */}
//         <div className="channel-list__sidebar__icon2">
//             <div className="icon2__inner" onClick={logout}>
//                 <img src={LogoutIcon} alt="logout icon" width='30' />
//             </div>
//         </div>
//     </div>
//         </>
//     )
// }

// const CompanyHeader = ()=>{
//     return(
//         <>
//         {/* header of our app  */}
//     <div className="channel-list__header">
//         <p className="channel-list__header__text">DocChat</p>
//     </div>
//         </>
//     )
// }

// // team filter 
// const customeChannelTeamFilter = (channels)=>{
//     return channels.filter((channel)=>channel.type==='team');
// }

// // messaging filter 
// const customeChannelMessagingFilter = (channels)=>{
//     return channels.filter((channel)=>channel.type==='messaging');
// }

// const ChannelListContent = ({ isCreating,setIsCreating,setCreateType,setIsEditing,setToggleContainer }) => {
//     const {client} = useChatContext();

//     const logout = ()=>{
//         //to remove all session and cookies ad reload
//         cookies.remove("token");
//         cookies.remove('userId');
//         cookies.remove('username');
//         cookies.remove('fullName');
//         cookies.remove('avatarURL');
//         cookies.remove('hashedPassword');
//         cookies.remove('phoneNumber');

//         window.location.reload()
//     }
// //all channel where usewr is included
//     const filters = {members : {$in:[client.userID]}}

//   return (
//     <>
//         <Sidebar logout={logout}/>
//         <div className="channel-list__list__wrapper">
//         {/* //header  */}
//             <CompanyHeader />
//             {/* search  */}
//             <ChannelSearch setToggleContainer={setToggleContainer} />
//             {/* channelList-> strem allow us to use there teamList but we are creating our custome here  */}
//         {/* channel list for group messages  */}
//         <ChannelList
//             filters={filters}
//             channelRenderFilterFn={customeChannelTeamFilter}
//             List={(listProps)=>(
//             <TeamChannelList {...listProps} type="team"
//                 isCreating={isCreating}
//                 setIsCreating={setIsCreating}
//                 setCreateType={setCreateType}
//                 setIsEditing={setIsEditing}
//                 setToggleContainer={setToggleContainer}
//                  /> // jo props channelList kheyega wao teamchannellist bhi khyega

//             )}
//             Preview={(previewProps)=>(
//                 <TeamChannelPreview 
//                 {...previewProps}
//                 setToggleContainer={setToggleContainer}
//                 setIsCreating={setIsCreating}
//                 setIsEditing={setIsEditing}
//                 type="team"/>
//             )}
//             />
// {/* channellist for DM's  */}
//         <ChannelList
//             filters={filters}
//             channelRenderFilterFn={customeChannelMessagingFilter}
//             List={(listProps)=>(
//             <TeamChannelList
//                 {...listProps}
//                 type="messaging"
//                 isCreating={isCreating}
//                 setToggleContainer={setToggleContainer}
//                 setIsCreating={setIsCreating}
//                 setCreateType={setCreateType}
//                 setIsEditing={setIsEditing}
//                    /> // jo props channelList kheyega wao teamchannellist bhi khyega

//             )}
//             Preview={(previewProps)=>(
//                 <TeamChannelPreview {...previewProps} 
//                 setToggleContainer={setToggleContainer}
//                 setIsCreating={setIsCreating}
//                 setIsEditing={setIsEditing}
//                 type="messaging"/>
//             )}
//             />
//         </div>
//     </>
//   )
// }
// const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing})=>{
//     const [toggleContainer, setToggleContainer] = useState(false)

//     return(
//         <>
//             <div className="channel-list__container">
//             {/* //for desktop */}
//                 <ChannelListContent 
//                 setIsCreating={setIsCreating}
//                 setCreateType={setCreateType}
//                 setIsEditing={setIsEditing}
//                 />
//             </div>

//             <div className="channel-list__container-responsive"
//             style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}} // to give that toggle effect
//             >
//             <div onClick={()=>setToggleContainer((prevToggleContainer)=>!prevToggleContainer)} className="channel-list__container-toggle">

//             </div>
//             {/* //for mobile  */}
//             <ChannelListContent 
//                 setIsCreating={setIsCreating}
//                 setCreateType={setCreateType}
//                 setIsEditing={setIsEditing}
//                 setToggleContainer={setToggleContainer}
//             />

                
//             </div>
//         </>
//     )
// }
// export default ChannelListContainer





import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Medical Pager</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-88%", backgroundColor: "#005fff"}}
            >
                <div className="channerl-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            </div>
        </>
    )

}

export default ChannelListContainer;