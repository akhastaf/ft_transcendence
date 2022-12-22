import { Box, Flex, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../Services/sockets";
import { Gamestate, Net } from "../Types/types";






// const user : Player = {
    //   x: 0,
    //   y: canvas!.height / 2 - 150 / 2,
    //   width: 15,
    //   height: 150,
    //   // color: 'white',
    //   score: 0
    // };
    
    // const com : Player = {
        //   x: canvas!.width - 15,
        //   y: canvas!.height / 2 - 150 / 2,
        //   width: 15,
        //   height: 150,
        //   // color: 'white',
        //   score: 0
        // }
        
        // const ball : Ball = {
            //   x: canvas!.width / 2,
            //   y: canvas!.height / 2,
            //   radius: 10,
            //   speed: 5,
            //   velocityX: 5,
            //   velocityY: 5,
            //   // color: 'white'
            // }
            
            
            const Game : React.FC <{
                id : string,
            }> = ({id}) => {
                // const canvas : HTMLCanvasElement | null = document.querySelector('#ponggame');
                const socket = useContext(SocketContext);
                const canvasRef = useRef(null)
                var canvas : any;
                var ctx : any;
                var net : Net;
                
                useEffect(() => {
                    canvas = canvasRef.current
                    ctx = canvas.getContext("2d"); 
                    console.log("canva", canvas);

                 net = {
                        x: canvas!.width / 2 - 1,
                        y: 0,
                        width: 3,
                        height: 15,
                        color: 'white'
                    }
                    drawRect(0, 0, canvas!.width, canvas!.height, 'black')
                },[])
                
                function drawRect(x: number, y : number, w : number, h: number, color: string): void {
                    ctx!.fillStyle = color;
                    ctx?.fillRect(x, y,w,h);
                }
                function drawCircle(x:number, y:number, r:number, color: string): void {
                    ctx!.fillStyle = color;
                    ctx?.beginPath(); 
                    ctx?.arc(x, y, r, 0, Math.PI * 2, true);
                    ctx?.closePath();
                    ctx?.fill();
                }
                function drawText(text: string, x: number, y: number, size: number, color: string) : void {
                    ctx!.fillStyle = color;
                    size *= 45;
                    ctx!.font = `${size}px arial`;
                    ctx?.fillText(text, x, y);
                }
                function drawNet() : void {
                    for(let i: number = 0; i <= canvas!.height; i+=25) {
                        drawRect(net.x, net.y + i, net.width, net.height, net.color);
                    }
                }
                
                
                
                // drawCircle(100, 100, 50, 'white');
                
                // drawText('somthing', 200, 200, 'white');
                function render(gamestate: Gamestate) : void {
                    //Clear the canvas
                    //  canvas!.width = 200;
                    //  canvas!.height = 100;
                    const gameContainer = document.querySelector<HTMLDivElement>('#game');
                    //  console.log('width ', gameContainer?.clientWidth);
                    //  console.log('height ', gameContainer?.clientHeight);
                    const rect: DOMRect | undefined = canvas?.getBoundingClientRect();
                    const sizeX =  rect!.width / gamestate.width;
                    const sizeY = rect!.height / gamestate.height;
                    
                    drawRect(0, 0, canvas!.width, canvas!.height, 'black');
                    
                    // Draw the net
                    drawNet();
                    
                    // Draw scors
                    drawText(gamestate.rightPlayer.score.toString(), 3 *  canvas!.width/4, canvas!.height/5, sizeX, 'white');
                    drawText(gamestate.leftPlayer.score.toString(), canvas!.width/4, canvas!.height/5, sizeX, 'green');
                    
                    // Draw paddle 
                    drawRect(gamestate.rightPlayer.x * sizeX, gamestate.rightPlayer.y * sizeY, gamestate.rightPlayer.width * sizeX, gamestate.rightPlayer.height * sizeY, 'white');
                    drawRect(gamestate.leftPlayer.x *sizeX, gamestate.leftPlayer.y * sizeY, gamestate.leftPlayer.width * sizeX, gamestate.leftPlayer.height * sizeY, 'green');
                    
                    // Draw ball
                    drawCircle(gamestate.ball.x * sizeX, gamestate.ball.y * sizeY, gamestate.ball.radius * sizeX, 'white');
                }
                
                
                useEffect(() => {
                    // console.log("hello world id = ", id)
                    // socket.emit('joingame', "classic");
                    // game(socket);
                    canvas?.addEventListener('mousemove', movePaddle);

                    function movePaddle(event:MouseEvent): void {
                      const rect: DOMRect | undefined = canvas?.getBoundingClientRect();
                      // const y = event.clientY - rect!.top - user.height/2;
                      socket.emit('input', { eventY: event.clientY, top: rect!.top, width: rect!.width, height: rect!.height });
                    }
                    socket.on('gamestate', (gamestate) => {
                        console.log("aaa");
                        render(gamestate);
                     });
                     socket.on('stopgame', winer => {
                       console.log(winer);
                     })

                },[])
    return <>
        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} w={"100%"} gap={"100px"}>
         <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} w={"100%"} id="game">
        <canvas ref={canvasRef} width="800" height="500" id="ponggame"></canvas>
        </Flex>
                <Box>
                    <Heading color={"#ffffff"}> User Your Mouse to Move </Heading>
                </Box>
            <button onClick={() => {socket.emit('add',{ mode : "custom"});}}>
              Play Game
            </button>
      </Flex>
    </>
}

export default Game;