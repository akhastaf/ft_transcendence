import { Flex, VStack , Image, Stack, Heading, Button, Text, Box, Menu, MenuList, StackDivider, Avatar} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'

import { IoCloseCircleSharp } from 'react-icons/io5';
import { ScoreCard } from '../Game/LeaderBoad';
import { getCurrentUser, getUserAchivements, getUsergame } from '../Services/user';
import { Game, UserType } from '../Types/types';




const Achievement: React.FC <{}> 
= ({}) => {

    const [user, setUser] = useState<UserType> ();

    useEffect(() => {
      getCurrentUser().then((res) => {
        setUser(res);
        // console.log("achivement = ", res, "set achi ", achievements);
      })
    },[])
    return <>
   <Card w={"100%"} minW={"300px"} bgGradient={'linear(to-r, green.200, pink.500)'} mt={"1%"} rounded={10} border={"none"} borderColor={"blue.200"} p={"2%"}>
  <CardHeader>
    <Heading size='md'>Achivements</Heading>
  </CardHeader>

  <CardBody >
    <Stack divider={<StackDivider />} spacing='4' w={"100%"} h={"100%"} overflowY={"auto"} css={{
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
          user?.achievements ? user.achievements?.map((achi) => (
            <Box key={achi.id}>
            <Heading size='xs' textTransform='uppercase'>
              {achi.type}
            </Heading>
            <Flex flexDir={"row"} gap={"10px"} justifyContent={"flex-start"} alignItems={"center"}>
              <Avatar src={achi.icon} />
              <Text pt='2' fontSize='sm'>
                {achi.description}
              </Text>
            </Flex>
          </Box>
          )) : <Heading>No achivement Yet</Heading>
        }
    </Stack>
  </CardBody>
</Card></>
}

export const LeaderBoad1: React.FC <{

    games : Game[]
}> 
= ({ games}) => {

        // const [games, setGame] = useState<>()



    return <>
   <Card  h={"100%"} w={"100%"} bgGradient={'linear(to-r, green.200, pink.500)'} mt={"1%"} rounded={10} border={"none"} borderColor={"blue.200"} p={"2%"}>
  <CardHeader>
    <Heading size='md'>Recent Games</Heading>
  </CardHeader>

  <CardBody >
    <Stack  spacing='4' maxH={"400px"} w={"100%"} h={"100%"} overflowY={"auto"} css={{
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
          {
           games?.map((game : Game) => (
              <ScoreCard key={game.id} game={game} />
            )) 
          }
          {
            !games && <Heading> No Games Played Yet</Heading>
          }
    </Stack>
  </CardBody>
</Card></>
}


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
                    
                  

                </Box>
            </MenuList>
            </Menu>
            </Box>
    </>
}

export const Fcard : React.FC <{user : UserType, pos : boolean}> = ({user, pos}) => {



    return (<Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        className='bg-gradient-to-r from-green-400 to-blue-500'
        w={"100%"}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={user.avatar}
          alt='Caffe Latte'
        />
      
        <Stack>
          <CardBody>
            <Heading size='md'>{user.username}</Heading>
            <Flex flexDir={"row"} justifyContent={"space-between"} align={"center"}>
            <Flex flexDir={"column"}>
            <Text py='2'>
              Level : {user.level}
            </Text>
            <Text py='2'>
              Wins : {user.win}
            </Text>
            <Text py='2'>
              Loses : {user.loss}
            </Text>
            </Flex>
            {
              pos && <Button>ADD Friend</Button>
            }
            </Flex>
          </CardBody>
      
          <CardFooter>
          <Text py='2'>
            Recent Achivement : {user?.achievements ? user?.achievements.at(-1)?.type : "No Achievement Yet"}
            </Text>
          </CardFooter>
        </Stack>
      </Card>);
}

const Profil : React.FC <{currentUser : UserType, closeModal : () => void}> = ({currentUser, closeModal}) => {
  const [games, setGames] = useState<any>();
  const [user, setUser1] = useState<any>();
  useEffect(() => {

    getCurrentUser().then((res) => {
      currentUser = res;
      setUser1(res);
      getUsergame(res.id).then((res) => {
        setGames(res);
    })
    })


  },[])
    return (<>

        <VStack w={"100%"} h={"100%"} pt={0} px={{base : "0px" , sm : "2%", md : "2%"}}>
           <Flex w={"100%"} flexDir={"column"} justifyContent={"space-evenly"} alignItems={"center"} gap={12}>
           <div id="up div" className="flex flex-row justify-around ">
                <h1 className="float-left font-bold left-0"> My Profile </h1>
                <button
                    className=" bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                    onClick={closeModal}
                >
                    <IoCloseCircleSharp className="text-emerald-400" />
                </button>
            </div>
            <Fcard user={currentUser} pos={false} />
            <Flex w={"100%"} flexDir={{ base : "column", xxl : "row"}} justifyContent={"space-between"} alignItems={"center"} gap={7} >
                <Flex w={"100%"} p={"5%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={7}>
                    <Text> Recent Games</Text>
                    <LeaderBoad1 games={games}/>
                </Flex>
                    <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={7} >
                    <Text>  Achivements</Text>
                         <Achievement />
                    </Flex>
                </Flex>

           </Flex>
        </VStack>
    
    </>)
}

export default Profil;