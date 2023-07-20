import "./Stats.css";
import OwedStats from './OwedStats';
import OweUserStats from "./OweUserStats";

export default function Stats() { 

  return ( 
    <div className="stats"> 
      <div className="title"> 
      </div>
      <div className="split2"> 
        <OwedStats/>
        <OweUserStats/>
      </div>
    </div>
  )

}