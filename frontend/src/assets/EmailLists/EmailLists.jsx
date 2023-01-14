import React from 'react';
import "./EmailLists.css";

const EmailLists = () => {
    const emailList = [];
    async function getList() {
        emailList = await axios.get("http://localhost:5000/api/user/get-email");
    }
    getList();
    return (
        <div className='EmailLists'>
            {
                (!emailList.length) && (emailList.map((val, ind) => {
                    <div key={ind} className='SubEmailLists'>
                        <div>{val.senderName}</div>
                        <div>{val.recieverName}</div>
                        <div>{val.body}</div>
                        <div>{val.time}</div>
                    </div>
                }))
            }
        </div>
    )
}

export default EmailLists