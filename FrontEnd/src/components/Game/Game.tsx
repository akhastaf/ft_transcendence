import { Box, Flex, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useRef, MouseEvent } from "react";
import { SocketContext } from "../Services/sockets";
import { Gamestate, Net } from "../Types/types";

            const Game : React.FC <{
                id : string,
            }> = ({id}) => {
                const socket = useContext(SocketContext);
                const canvasRef = useRef(null)
                var canvas : any;
                var ctx : any;
                var net : Net;
                
                useEffect(() => {
                    canvas = canvasRef.current
                    ctx = canvas.getContext("2d"); 

                    net = {
                            x: canvas!.width / 2 - 1,
                            y: 0,
                            width: 3,
                            height: 15,
                            color: 'white'
                        }
                    drawRect(0, 0, canvas!.width, canvas!.height, 'black');
                    canvas?.addEventListener('mousemove', movePaddle);
                    socket.on('stopgame', (end) => {
                      console.log("Game over");
                      drawText('Game over', canvas?.width / 2, canvas?.height / 2, 2, '#0F9B8E');
                    })
                    socket.on('gamestate', (gamestate) => {
                        render(gamestate);
                     });
                    //  console.log('after');
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
                    ctx!.textBaseline = 'middle';
                    ctx!.textAlign = "center";
                    ctx?.fillText(text, x, y);
                }
                function drawNet() : void {
                    for(let i: number = 0; i <= canvas!.height; i+=25) {
                        drawRect(net.x, net.y + i, net.width, net.height, net.color);
                    }
                }
                const movePaddle = (event : MouseEvent) => {
                
                    // if (canvasRef.current) {
                        const rect: DOMRect | undefined = canvas?.getBoundingClientRect();
                        socket.emit('input', { eventY: event.clientY, top: rect!.top, width: rect!.width, height: rect!.height });
                    // }
                }
                // function movePaddle(event:MouseEvent): MouseEventHandler<HTMLCanvasElement> {
                // }
                
                
                
               
                function render(gamestate: Gamestate) : void {
                    // if (g)
                    // const rect: DOMRect | undefined = canvas!.getBoundingClientRect();
                    const sizeX =  1;//rect!.width / gamestate.width || 1;
                    const sizeY = 1;//rect!.height / gamestate.height || 1;
                    
                    drawRect(0, 0, canvas!.width, canvas!.height, 'black');
                    drawNet();
                    drawText(gamestate.rightPlayer.score.toString(), 3 * canvas!.width/4, canvas!.height/5, sizeX, 'white');
                    drawText(gamestate.rightPlayer.username, 3 * canvas!.width/4, 0.5 * canvas!.height/5, 0.5, 'white');
                    drawText(gamestate.leftPlayer.score.toString(), canvas!.width/4, canvas!.height/5, sizeX, 'green');
                    drawText(gamestate.leftPlayer.username, canvas!.width/4, 0.5 * canvas!.height/5, 0.5, 'green');
                    drawRect(gamestate.rightPlayer.x * sizeX, gamestate.rightPlayer.y * sizeY, gamestate.rightPlayer.width * sizeX, gamestate.rightPlayer.height * sizeY, 'white');
                    drawRect(gamestate.leftPlayer.x *sizeX, gamestate.leftPlayer.y * sizeY, gamestate.leftPlayer.width * sizeX, gamestate.leftPlayer.height * sizeY, 'green');
                    drawCircle(gamestate.ball.x * sizeX, gamestate.ball.y * sizeY, gamestate.ball.radius * sizeX, 'white');
                }
                
                
                // useEffect(() => {
                //     // console.log("hello world id = ", id)
                //     // socket.emit('joingame', "classic");
                //     // game(socket);
                //     canvas?.addEventListener('mousemove', movePaddle);

                //     function movePaddle(event:MouseEvent): void {
                //       const rect: DOMRect | undefined = canvas?.getBoundingClientRect();
                //       // const y = event.clientY - rect!.top - user.height/2;
                //       if (rect != undefined)
                //         socket.emit('input', { eventY: event.clientY, top: rect!.top, width: rect!.width, height: rect!.height });
                //     }
                //     socket.on('gamestate', (gamestate) => {
                //         console.log("aaa");
                //         render(gamestate);
                //      });
                //      socket.on('stopgame', winer => {
                //        console.log("dadahbduabdabjdbajb");
                //      })
                //      console.log('after');
                // })
    return <>
        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} w={"100%"} gap={"100px"}>
         <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} w={"100%"} id="game">
        <canvas ref={canvasRef} width="800" height="500" id="ponggame"></canvas>
        </Flex>
                <Box>
                    <Heading color={"#ffffff"}> Use Your Mouse to Move </Heading>
                </Box>
            <button onClick={() => {socket.emit('add',  "classic");}}>
              Play Game
            </button>
      </Flex>
    </>
}

export default Game;