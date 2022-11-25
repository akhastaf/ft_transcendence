// Main page of components/Home.tsx 
//     -> ChannelList page {rooms [], selectRoomHandler, choosenChat, Notifications, function to createRoom}

//     -> userList page 







//     // to build entity 
//         -> define the type (interface)
//         -> const [rooms, setRooms] = useState<any>([]);
//         -> in useaffect called function to get allRooms and then their users

//         ( getAllRomsAndUsersApi()
//         .then((roomsUsersData) => {
//             setRooms(roomsUsersData.rooms);
//             setUsers(roomsUsersData.users);
//         })
//         .catch((err) => console.log(err));)

// // leaderboard

// // i need friends for home page -> we have getAllDms in back but it returns array of channel modal . (adding friends block friend routes)
// // souinia said its bad practice what we do to get id of chat room (front emit (create) ->  back emit id )
// // throw an error if password given for protected channel is wrong

// -- BETTER ROUTING (checked)




// i clicked on Room/user -> /channels/choosenChat.id     display chat with {of the room} (checked) fixed
//   ----- updated 

// try to check if user is admin then display the + button to add users from friend list ( friend list not ready yet / block list / [friend request])




// ////////
// about react-query 
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
// const queryClient = new QueryClient()

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Example />
//       <ReactQueryDevtools />
//     </QueryClientProvider>
//   )
// }


// -> async function fetchCars() {
//   const res = await fetch('/data.json');
//   return res.json();
// }


// function Cars() {
//   const {data , status} = useQuery('cars', fetchCars);

//      if (status === 'loading')
//        return <p> loading ... </p>
//     //! if the request fails it will retry 3 times if the failing
//      perssits the status changes to error
//        if (status === 'error')
//          return <p>error</p>
//        return (<ul> 
//          data.map((car) => (<li key={car.id}>{car.make}</li>)

//          </ul>)
//     const mutation = userMutation(postTodo,    (mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, React Query exports a useMutation hook.)
//     {
//        onSucess: () => {
      //? invalidate and refetch
      // * queryClient.invalidateQuery('cars)

//}
//       }) 
      
       //! when data is written to the server we can hook into int when the on sucess function 
      
      // !  and auto invalidate the query we already made based on its key (cars)
      
      // ! this tell reactquery to invalidate and refetch the original request
      
      // ! we can tap into the state of this process 
// }


// id room + new member



/// front to add memeber list for addng members to group
// set addmin , kick from group , play , check profile // mute and ban 
// profil { achivement}
// display where to click to start Game,
// better leaderboard