import NavBar from '../NavBar/NavBar';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Profile() { 

  const { user } = useAuthContext(); 

  return ( 
    <div> 
      <NavBar/> 
      <div className="user_details"> 
        <div className="firstName"><h2> First Name: {user.firstName} </h2></div>
        <div className="lastName"><h2>Last Name: {user.lastName} </h2></div>
        <div className="email "><h2>Email: {user.email}</h2></div>
      </div>
    </div>
  )

}