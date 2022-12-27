import { Game, Userstatus, UserType } from "../Types/types";
import { Box, VStack, Flex, Text, Button, Image, MenuList, Menu, MenuButton, LinkBox, Heading, useToast } from "@chakra-ui/react"
import { socket } from "../Services/sockets";
import { useNavigate } from "react-router-dom";



const vs = require('../../images/vs.png');

const Leaderboard1: React.FC<{
        games : Game[]
}> = ({ games }) => {
    return <>

        <div className="flex h-auto  mt-11 ">
            <div id="down div" className="h-full flex w-full m-auto  flex-row ">
                <div className="w-1/6"></div>
                <div className="flex flex-col h-[40rem] w-[80rem]">

                    <div className="p-4 w-full  bg-gradient-to-r from-green-400 to-blue-500 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-y-scroll scrollbar-hide">
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="text-xl font-bold leading-none text-white dark:text-white">Current Games</h5>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className=" divide-y divide-gray-200 dark:divide-gray-700">
                                {
                                     games?.map((game : Game) => (
                                        <ScoreCard game= {game} key={game._id} />
                                    ))
                                }
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

const Leaderboard: React.FC<{
    games : Game[]
}> = ({ games }) => {
    return <>
        <Box  w={"100%"} h={"100%"} >
        <Menu isOpen={true}>
            <MenuList w={"80rem"} bgGradient={'linear(to-r, green.200, pink.500)'} mt={"1%"} rounded={10} border={"none"} borderColor={"blue.200"} p={"2%"}>
                <Box w={"100%"} h={"100%"} overflowY={"auto"} css={{
                    "&::-webkit-scrollbar": {
                        width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#8ccef0",
                        borderRadius: "24px",
                    },
                }}>
                     {
                                     games?.map((game : Game) => (
                                        <ScoreCard game= {game} key={game._id} />
                                    ))
                                }

                </Box>
            </MenuList>
            </Menu>
            </Box>
    </>
}

export const ScoreCard: React.FC<{
    game : Game
}> = ({ game }) => {
    // console.log("res score == ", game);
    const toast = useToast();
    const navigate = useNavigate();
    const watchGame = () => {
        console.log("game = ", game.status)
        if (game.status === "playing")
        {
            socket.emit("joingame",game.roomGame)
            navigate("/channels/Game/1");
        }
        else
        {
            toast({
				title: 'Game',
				description: "The Game is Finnished",
				status: 'info',
				duration: 9000,
				isClosable: true,
			  })
        }
    }
    let color : string = game?.player1.status === Userstatus.ONLINE ? "text-green-300" : game?.player1.status === Userstatus.OFFLINE ? "text-red-700" : "text-blue-700";
    let color1 : string = game?.player2.status === Userstatus.ONLINE ? "text-green-300" : game?.player2.status === Userstatus.OFFLINE ? "text-red-700" : "text-blue-700";
    return (
        <>
            <li onClick={watchGame} className="list-none  hover:brightness-50  p-3 sm:py-4 min-w-fit">
            
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-12 h-12 rounded-full" src={game.player1.avatar} alt="Neil image" />
                    </div>
                    <div className="flex-1  min-w-fit">
                        <p className="text-lg font-medium arcade text-white  dark:text-white">
                            {game.player1.username}
                        </p>
                        <p className="text-sm  text-beige_color dark:text-gray-400">
                            {game.player1.email}
                        </p>
                        <div className={`inline-flex items-center arcade text-base font-semibold ${color} `}>
                            {game.player1.status}
                        </div>
                    </div>
                    <Heading>{game.score1}</Heading>
                    <div className="text-bold flex-1 m-auto">
                        <img className="w-20 h-20" src={vs} />
                    </div>
                    <Heading>{game.score2}</Heading>
                    <div className="inline-flex items-center arcade  text-green-300 dark:text-white">

                        <div className="flex-1 pr-10 min-w-5">
                            <p className="text-lg font-medium arcade text-white truncate dark:text-white">
                                {game.player2.username}
                            </p>
                            <p className="text-sm  text-beige_color truncate dark:text-gray-400">
                                {game.player2.email}
                            </p>
                            <div className={`inline-flex items-center arcade text-base font-semibold ${color1}`}>
                                {game.player2.status}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img className="w-12 h-12 rounded-full" src={game.player2.avatar} alt="Neil image" />
                        </div>
                    </div>
                   
                </div>

            </li>
        </>)
}






export default Leaderboard;