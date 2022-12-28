import { Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Fcard } from "../EditProfil/Profile";
import { getAUser, getCurrentUser } from "../Services/user";
import { userModel, Userstatus, UserType } from "../Types/types";




const Profile : React.FC <{
    closeModal : React.Dispatch<React.SetStateAction<boolean>>
    user: userModel,
}> = ({closeModal, user}) => {

    const [userInfo, setUserInfo] = useState<UserType>({
        id: "",
		username: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		avatar: "",
		email: "",
		phoneNumber: null,
		friends: [],
		bloked: [],
		status: Userstatus.OFFLINE,
		twofa : false,
        level : 0,
        win : 0,
        loss : 0,
        achievements : [],
    })
    const [fon , setFon] = useState(true);
    useEffect(() => {
    getAUser(user.id)
    .then((res) => {
        setUserInfo(res);
    })
    // console.log("user = ", userInfo);
    getCurrentUser().then((res) => {
        console.log("res = ", res);
    res.friends?.map((friend : any) => {
        console.log("user c id = ", user.id, "friend id = ", friend.id)
        if (parseInt(friend.id) == user.id)
        {
            setFon(false);
        }
    })})
},[])
   
    return <>
      <div
            className="justify-center items-center  flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => { closeModal(false); }}
        >
            <div className="flex items-center " onClick={e => { e.stopPropagation(); }} >
                {/* <div className="w-[30rem] my-6 mx-auto h-[25rem]   " > */}
                    <Flex gap={12} onClick={e => { e.stopPropagation(); }} bg={"#36393f"} flexDir={"column"} justifyContent={"space-between"} w={"30rem"} alignItems={"center"} h={"25rem"}>
                    <Flex  h={"100%"} flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} gap={8}>
                        <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"}>
                            <button
                                className="p-1 ml-auto bg-transparant  text-black  float-right text-3xl leading-none font-semibold"
                                onClick={() => closeModal(false)}
                            >
                                <IoCloseCircleSharp className="text-emerald-400" />
                            </button>
                            <h2 className="text-center text-xl font-bold text-white">{user.name}'s Profile </h2>
                
                        </Flex>
                        <Fcard user={userInfo} pos={fon} />
                        </Flex>
                    </Flex>

                {/* </div> */}
            </div>
        </div>
        <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </>
}

export default Profile; 