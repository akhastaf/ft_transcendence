import { useState } from "react"
import { UserType } from "../Types/types"
import Leaderboard from "./LeaderBoad"

const GameHome : React.FC <{
    currentUser: UserType
}> = ({currentUser}) => {
    const [state, setState] = useState(false);
    return <>
        {
             !state && <><div className="flex flex-col devide-x-2">
            <div className="">
                    <Leaderboard currentUser={currentUser}/>
            </div>
            <div className="">
                    <p>hello </p>
            </div>

        </div>
            </>
        }
        {
            state && <>
            
            </>
        }
    </>
}



const GameModes : React.FC <{

}> = ({}) =>
{
    return <></>
}

export default GameHome;