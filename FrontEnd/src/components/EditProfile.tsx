import { useEffect, useState } from "react"
import { getCurrentUser } from "./Services/user";
import SideBar from "./SideBar/SideBar";
import SideBarE from "./EditProfil/SideBarE";
import { ChatType, UserType } from "./Types/types";


const EditProfile : React.FC <{

	
    

}> = ({}) => {
    
    const [userInfo, setUserInfo] = useState<UserType>({
        _id: "",
        username: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: "",
        email: "",
        phoneNumber: null
    });

    useEffect(() => {
        getCurrentUser() // !! to be changed becasue its mr93a (change to connected socket)
        .then((user) => {
            setUserInfo(user[0]);
            console.log(user);
        })
        .catch((err) => console.log(err));
    },[]);

    
    return (<> 
        {/* <SideBarE /> */}


    </>)
};

export default EditProfile;