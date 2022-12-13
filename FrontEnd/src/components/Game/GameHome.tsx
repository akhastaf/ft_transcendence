import { useState } from "react"
import { UserType } from "../Types/types"
import Leaderboard from "./LeaderBoad"

const GameHome : React.FC <{
    currentUser: UserType
}> = ({currentUser}) => {
    const [state, setState] = useState(false);
    return <>
        {
             !state && <>
            <div className="flex flex-col px-10">
                <Leaderboard currentUser={currentUser}/>
                <div className="">

                </div>
            </div>
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