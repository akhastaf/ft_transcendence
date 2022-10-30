import { UserType } from "../Types/types";

const Settings : React.FC <{
    currentUser: UserType
    selected: string
    logoutHandler: () => void
}> = ({selected , currentUser, logoutHandler}) => {

 


    return (<>
        {
            selected === "My Account" && <UserCard />
        }
        {
            selected === "My Profile" && <FriendList />
        }
        {
            selected === "Friend List" && <FriendList />
        }
        {
            selected === "Block List" && <FriendList />
        }
        {
            selected === "Friend Request" && <FriendList />
        }
        {
            selected === "Disconnect" && <FriendList />
        }
    </>)
}
export default Settings;


const UserCard : React.FC <{

}> = ({}) => {
    return <>
        <div className="flex flex-col ">
            <h1> My Account </h1>
            <div className="">

            </div>
        </div>
    </>
};


const FriendList : React.FC <{

}> = ({}) => {
    return <>
        <div>
        </div>
    </>
};