import React from 'react'

function MetricIntegrity({dataset}) {
    console.log(dataset);

    const uniqueData = dataset.reduce((acc,curr)=>{
        const {actionname,interactiontype,feedbackstatus} = curr;

        const existingEntry = acc.find(item => item.actionname === actionname);

        if(existingEntry){
            existingEntry.openCount+= interactiontype === "open"? 1 :0;
            existingEntry.clickCount+= interactiontype === "click"? 1 :0;
            existingEntry.unsubscribeCount+= interactiontype === "unsubscribe"? 1 :0;
            existingEntry.sentCount+= feedbackstatus  === "sent"? 1 :0;
            existingEntry.bounceCount+= feedbackstatus  === "bounce"? 1 :0;
            existingEntry.delayCount+= feedbackstatus  === "delay"? 1 :0;
        }else{
            acc.push({
                actionname,
                openCount:interactiontype === "open"? 1 :0,
                clickCount:interactiontype === "click"? 1 :0,
                unsubscribeCount:interactiontype === "unsubscribe"? 1 :0,
                sentCount:feedbackstatus  === "sent"? 1 :0,
                bounceCount:feedbackstatus  === "bounce"? 1 :0,
                delayCount:feedbackstatus  === "delay"? 1 :0

            })
        }
        return acc;
    },[])

    console.log(uniqueData);
    
    
  return (
    <>
    <div>
        <h4 className='text-center'>Total Mails :{dataset.length} </h4>
        <table className='table'>
            <thead>
                <tr>
                    <th className='text-center'>SlNo</th>
                    <th>Action Name</th>
                    <th className='text-center'>Send</th>
                    <th className='text-center'>Bounced</th>
                    <th className='text-center'>Open</th>
                    <th className='text-center'>Click</th>
                    <th className='text-center'>Unsubscribe</th>

                </tr>
            </thead>
            <tbody>
               {uniqueData.map((item,index)=>(
                <tr key={index}>
                <td className='text-center'>{index+1}</td>
                <td>{item.actionname}</td>
                <td className='text-center'>{item.sentCount + item.delayCount}</td>
                <td className='text-center'>{item.bounceCount}</td>
                <td className='text-center'>{item.openCount}</td>
                <td className='text-center'>{item.clickCount}</td>
                <td className='text-center'>{item.unsubscribeCount}</td>
            </tr>
               )) }
            </tbody>
        </table>
    </div>
    </>
  )
}

export default MetricIntegrity