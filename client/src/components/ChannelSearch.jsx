//! use to search to the channels 
import React, { useState, useEffect } from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';

import { ResultsDropdown } from './'
import { SearchIcon } from '../assets';


const ChannelSearch = ({setToggleContainer}) => {
    const { client, setActiveChannel } = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])

    useEffect(()=>{
      if(!query){
        setTeamChannels([])
        setDirectChannels([])
      }
    },[query])

  //search for the channel is async process
  const getChannel  = async (text)=>{
      try {
        const channelResponse = client.queryChannels({
          type: 'team', 
          name: { $autocomplete: text }, 
          members: { $in: [client.userID]}
      });
      const userResponse = client.queryUsers({
          id: { $ne: client.userID },
          name: { $autocomplete: text }
      })

      const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

      if(channels.length) setTeamChannels(channels);
      if(users.length) setDirectChannels(users);

      } catch (error) {
        setQuery('')
      }
  }

  const onSearch = (e)=>{
    //browser will reload the page on submit the form this line prevent to be single page
    e.preventDefault()
    setLoading(true)
    // whatever we type get get it like this
    setQuery(e.target.value) 
    getChannel(e.target.value)
  }

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
}

  return (
    <div className='channel-search__container'>
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input 
        type="text" 
        className='channel-search__input__text' 
        placeholder='Search'
        value={query}
        onChange={onSearch}
         />

      </div>
      {query && (
        <ResultsDropdown 
        teamChannels={teamChannels}
        directChannels={directChannels}
        loading={loading}
        setChannel={setChannel}
        setQuery={setQuery}
        setToggleContainer={setToggleContainer}
      />
      )}
    </div>
  )
}

export default ChannelSearch