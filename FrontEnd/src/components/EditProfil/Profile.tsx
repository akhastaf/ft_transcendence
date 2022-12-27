import { Flex, VStack , Image, Stack, Heading, Button, Text, Box, Menu, MenuList, StackDivider} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5';
import { ScoreCard } from '../Game/LeaderBoad';
import { getGames } from '../Services/game';
import { Game, UserType } from '../Types/types';




const Achievement: React.FC <{}> 
= ({}) => {
    return <>
   <Card bgGradient={'linear(to-r, green.200, pink.500)'} mt={"1%"} rounded={10} border={"none"} borderColor={"blue.200"} p={"2%"}>
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
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Summary
        </Heading>
        <Text pt='2' fontSize='sm'>
          View a summary of all your clients over the last month.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Overview
        </Heading>
        <Text pt='2' fontSize='sm'>
          Check out the overview of your clients.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Analysis
        </Heading>
        <Text pt='2' fontSize='sm'>
          See a detailed analysis of all your business clients.
        </Text>
      </Box>
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
              <ScoreCard key={game._id} game={game} />
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

export const Fcard : React.FC <{user : UserType}> = ({user}) => {
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
  const [games, setGames] = useState<any>();
  useEffect(() => {
  getGames().then((res) => {
      setGames(res);
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
            <Fcard user={currentUser} />
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