import { Flex, VStack , Image, Stack, Heading, Button, Text, Box, Menu, MenuList} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import React from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5';
import { ScoreCard } from '../Game/LeaderBoad';
import { UserType } from '../Types/types';



const Leaderboard: React.FC<{
    currentUser: UserType
}> = ({ currentUser }) => {
    return <>
        <Box position={"relative"} h={"40rem"} w={"30rem"} >
        <Menu isOpen={true}>
            <MenuList w={"30rem"} bgGradient={'linear(to-r, green.200, pink.500)'} mt={"1%"} rounded={10} border={"none"} borderColor={"blue.200"} p={"2%"}>
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

const Fcard : React.FC <{}> = ({}) => {
    return (<Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        className='bg-gradient-to-r from-green-400 to-blue-500'
        w={"100vh"}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
          alt='Caffe Latte'
        />
      
        <Stack>
          <CardBody>
            <Heading size='md'>Mohamed khames</Heading>
      
            <Text py='2'>
              Level : 2
            </Text>
            <Text py='2'>
              Wins : 2
            </Text>
            <Text py='2'>
              Loses : 2
            </Text>
          </CardBody>
      
          <CardFooter>
          <Text py='2'>
            Recent Achivement : won 3 games
            </Text>
          </CardFooter>
        </Stack>
      </Card>);
}

const Profil : React.FC <{currentUser : UserType, closeModal : () => void}> = ({currentUser, closeModal}) => {
    return (<>

        <VStack w={"100%"} h={"100%"} pt={0} px={{base : "0px" , sm : "2%", md : "2%"}}>
           <Flex flexDir={"column"} justifyContent={"space-evenly"} alignItems={"center"} gap={12}>
           <div id="up div" className="flex flex-row justify-around ">
                <h1 className="float-left font-bold left-0"> My Profile </h1>
                <button
                    className=" bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                    onClick={closeModal}
                >
                    <IoCloseCircleSharp className="text-emerald-400" />
                </button>
            </div>
                <Fcard />
                <Flex flexDir={"row"} justifyContent={"space-between"} alignItems={"center"} gap={7} >
                <Flex w={"30"} p={"5%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={7}>
                    <Text> Recent Games</Text>
                    <Leaderboard currentUser={currentUser}/>
                </Flex>
                    <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={7} >
                    <Text>  Achivements</Text>
                        <Leaderboard currentUser={currentUser}/>
                    </Flex>
                </Flex>

           </Flex>
        </VStack>
    
    </>)
}

export default Profil;