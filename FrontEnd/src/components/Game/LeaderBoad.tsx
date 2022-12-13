import { UserType } from "../Types/types";
import { Box, VStack, Flex, Text, Button, Image, MenuList, Menu, MenuButton, LinkBox } from "@chakra-ui/react"



const vs = require('../../images/vs.png');

const Leaderboard1: React.FC<{
    currentUser: UserType
}> = ({ currentUser }) => {
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

                                }
                                <ScoreCard currentUser={currentUser} />
                                <ScoreCard currentUser={currentUser} />
                                <ScoreCard currentUser={currentUser} />
                                <ScoreCard currentUser={currentUser} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

const Leaderboard: React.FC<{
    currentUser: UserType
}> = ({ currentUser }) => {
    return <>
        <Box position={"relative"} h={"40rem"} w={"80rem"} >
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
                    {/* <Slider {...settings} > */}

                    {/* <FeedArtical title={"best Article"} time={"10 min"} desc={"A new wave of traders has started in the trading market"} author={"Mohamed Ouch."} />
                    <FeedArtical title={"best Article"} time={"10 min"} desc={"A new wave of traders has started in the trading market"} author={"Mohamed Ouch."} />
                    <FeedArtical title={"best Article"} time={"10 min"} desc={"A new wave of traders has started in the trading market"} author={"Mohamed Ouch."} />
                    <FeedArtical title={"best Article"} time={"10 min"} desc={"A new wave of traders has started in the trading market"} author={"Mohamed Ouch."} />
                    <FeedArtical title={"best Article"} time={"10 min"} desc={"A new wave of traders has started in the trading market"} author={"Mohamed Ouch."} />
                    <FeedArtical title={"best Article"} time={"10 min"} desc={"A new wave of traders has started in the trading market"} author={"Mohamed Ouch."} /> */}
                    {/* </Slider> */}
                    <ScoreCard currentUser={currentUser} />
                    <ScoreCard currentUser={currentUser} />
                    <ScoreCard currentUser={currentUser} />
                    <ScoreCard currentUser={currentUser} />

                </Box>
            </MenuList>
            </Menu>
            </Box>
    </>
}

export const ScoreCard: React.FC<{
    currentUser: UserType
}> = ({ currentUser }) => {
    return (
        <>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-12 h-12 rounded-full" src={currentUser.avatar} alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium arcade text-white truncate dark:text-white">
                            {currentUser.username}
                        </p>
                        <p className="text-sm  text-beige_color truncate dark:text-gray-400">
                            {currentUser.email}
                        </p>
                        <div className="inline-flex items-center arcade text-base font-semibold text-gray-900 dark:text-white">
                            {currentUser.status}
                        </div>
                    </div>
                    <div className="text-bold flex-1 m-auto">
                        <img className="w-20 h-20" src={vs} />
                    </div>
                    <div className="inline-flex items-center arcade  text-green-300 dark:text-white">

                        <div className="flex-1 pr-10 min-w-0">
                            <p className="text-lg font-medium arcade text-white truncate dark:text-white">
                                {currentUser.username}
                            </p>
                            <p className="text-sm  text-beige_color truncate dark:text-gray-400">
                                {currentUser.email}
                            </p>
                            <div className="inline-flex items-center arcade text-base font-semibold text-gray-900 dark:text-white">
                                {currentUser.status}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img className="w-12 h-12 rounded-full" src={currentUser.avatar} alt="Neil image" />
                        </div>
                        {/* <div className="inline-flex items-center arcade text-base font-bold text-red-500 dark:text-white">
                        lost : 2
                    </div>
                    <div className="inline-flex items-center whitespace-pre arcade text-base font-bold text-yellow-500 dark:text-white">
                        Best Achievement : 6 wins straight
                    </div> */}
                    </div>

                </div>

            </li>
        </>)
}




export default Leaderboard;