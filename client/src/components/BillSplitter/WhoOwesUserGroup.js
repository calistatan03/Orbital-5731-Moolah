import WhoOwesUserItem from './WhoOwesUserItem';

export default function WhoOwesUserGroup({billData}) { 
  const memberNames = billData.memberNames;
  return <div>
    {memberNames.length === 1 && <WhoOwesUserItem memberName={memberNames[0]} />}
    {memberNames.length > 1 && memberNames.map((object) => { 
      return ( 
        <WhoOwesUserItem memberName={object.memberName} bill={billData}/>
      )
    }
    )}
  </div>

}