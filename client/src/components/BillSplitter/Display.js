import NavBar from "../NavBar/NavBar";
import OpenForm from "./OpenForm";

export default function Display() { 
  return ( 
    <div>
      <NavBar/>
      <div className="add_new_bill">
        <OpenForm/>
      </div>
      <div className="owing_details">
      </div>
        

    </div>
  )
}