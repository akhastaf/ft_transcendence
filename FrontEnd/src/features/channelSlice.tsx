// import React from "react";
import {createSlice} from "@reduxjs/toolkit";

const initialState = { 
    channelId: null,
    channelName: null,
    Icon : null,



};

export const channelSlice = createSlice({
    name : "channel",
    initialState,
    reducers :{
        setChannelInfo: (state, action) => {
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
            state.Icon = action.payload.Icon;
        }
    }

});


export  const {setChannelInfo} = channelSlice.actions;
export const selectChannelId = (state :any) => state.channel.channelId;
export const selectChannelName = (state :any) => state.channel.channelName;
export const selectChannelIcon = (state :any) => state.channel.channelIcon;

export default channelSlice.reducer;