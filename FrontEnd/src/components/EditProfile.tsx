import { useEffect, useState } from "react"
import { getCurrentUser } from "./Services/user";
import SideBar from "./SideBar/SideBar";
import SideBarE from "./EditProfil/SideBarE";
import { ChatType, Userstatus, UserType } from "./Types/types";


const EditProfile : React.FC <{

	
    

}> = ({}) => {
    
    // const [userInfo, setUserInfo] = useState<UserType>({
    //     _id: "",
    //     username: "",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     avatar: "",
    //     email: "",
    //     phoneNumber: null,
    //     friends: [],
    //     bloked: [],
    //     status: Userstatus.OFFLINE,
    // });

    useEffect(() => {
        
    },[]);

    
    return (<> 
        {/* <SideBarE /> */}


    </>)
};

export default EditProfile;