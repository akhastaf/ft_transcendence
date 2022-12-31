import { useState, useEffect } from "react"
import {  UserType } from "../Types/types"
import CardMode from "./GameCard"
// import Leaderboard from "./LeaderBoad"
import {LeaderBoad1} from "../EditProfil/Profile"

import {Flex, VStack, Box} from '@chakra-ui/react'
import { getGames } from "../Services/game"
import { socket } from "../Services/sockets"

const GameHome : React.FC <{
    currentUser: UserType
}> = () => {
    const [games, setGames] = useState<any>();
    const [update, setUpdate] = useState<any>(false);
    useEffect(() => {
        socket.on("newGame_server", (data)=> {
            setUpdate(!update)
        })
    getGames().then((res) => {
        setGames(res);
    })

    },[update])


    return <>
       
            <Box h='calc(100vh)' p={"5%"} w={"100%"} >
            <VStack position={"relative"} h={"100%"} width={"100%"} maxH={"100%"} overflowY={"auto"} css={{
                    "&::-webkit-scrollbar": {
                        width: "0px",
                    },
                    "&::-webkit-scrollbar-track": {
                        width: "0px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#8ccef0",
                        borderRadius: "24px",
                    },
                }}>
                <Flex position={"relative"} flexDir={"row"} gap={6} justifyContent={"space-between"} alignItems={"center"}>
                        <LeaderBoad1 games={games} />
                        <Flex gap={5} position={"relative"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>
                        <CardMode mode={"Classic (PvP)"} desc={"Enter the Queue and Enjoy the PongGame with A random Player"} />
                        <CardMode mode={"Custom (PvCO)"} desc={"Enjoy The Game against Our beloved CO"} />
                </Flex>
            </Flex>
            </VStack>
            </Box>
    </>
}


export default GameHome;