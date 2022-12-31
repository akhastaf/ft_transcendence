import { Game, Userstatus } from "../Types/types";
import { Box, MenuList, Menu, Heading, useToast } from "@chakra-ui/react"
import { socket } from "../Services/sockets";
import { useNavigate } from "react-router-dom";



const vs = require('../../images/vs.png');


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
                                        <ScoreCard game= {game} key={game.id} />
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
    const toast = useToast();
    const navigate = useNavigate();
    const watchGame = () => {
        if (game.status === "playing")
        {
            socket.emit("joingame",game.room)
            navigate("/channels/Game/");
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
                        <img className="w-12 h-12 rounded-full" src={game.player1.avatar} alt="player1" />
                    </div>
                    <div className="flex-1  min-w-fit">
                        <p className="text-lg font-medium arcade text-white  dark:text-white">
                            {game.player1.nickname}
                        </p>
                        {/* <p className="text-sm  text-beige_color dark:text-gray-400">
                            {game.player1.email}
                        </p> */}
                        <div className={`inline-flex items-center arcade text-base font-semibold ${color} `}>
                            {game.player1.status}
                        </div>
                    </div>
                    <Heading>{game.score1}</Heading>
                    <div className="text-bold flex-1 m-auto">
                        <img className="w-20 h-20" src={vs} alt={"vs"}/>
                    </div>
                    <Heading>{game.score2}</Heading>
                    <div className="inline-flex items-center arcade  text-green-300 dark:text-white">

                        <div className="flex-1 pr-10 min-w-5">
                            <p className="text-lg font-medium arcade text-white truncate dark:text-white">
                                {game.player2.nickname}
                            </p>
                            {/* <p className="text-sm  text-beige_color truncate dark:text-gray-400">
                                {game.player2.email}
                            </p> */}
                            <div className={`inline-flex items-center arcade text-base font-semibold ${color1}`}>
                                {game.player2.status}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img className="w-12 h-12 rounded-full" src={game.player2.avatar} alt="player2" />
                        </div>
                    </div>
                   
                </div>

            </li>
        </>)
}






export default Leaderboard;