import WhoOwesUserItem from './WhoOwesUserItem';

export default function WhoOwesUserGroup({billData}) { 
  const memberNames = billData.memberNames;
  return <div>
    {memberNames.length === 1 && <WhoOwesUserItem memberName={memberNames[0].memberName} billData={billData} />}
    {memberNames.length > 1 && memberNames.map((object) => { 
      return ( 
        <WhoOwesUserItem memberName={object.memberName} billData={billData}/>
      )
    }
    )}
  </div>

}