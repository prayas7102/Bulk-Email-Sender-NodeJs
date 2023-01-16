import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./EmailLists.css";

const EmailLists = () => {
    const [emailFinalList, setemailFinalList] = useState([]);
    const modifyString = (str) => {
        const FinalStr = str.replace(/(<([^>]+)>)/ig, '');
        return FinalStr.replace("/&nbsp;/ig", "");
    }
    useEffect(() => {
        async function getList() {
            const emailList = await axios.get("https://bulk-email-sender-nodejs.onrender.com/api/user/get-email");
            setemailFinalList(emailList.data.emailList);
        }
        getList();
    }, [])
    console.log(emailFinalList.length)
    return (
        <div className='EmailLists'>
            <div className='heading'>
                <strong>SENDER </strong>
                <strong>RECIVER</strong>
                <strong>MESSAGE</strong>
                <strong>DATE</strong>
            </div>
            {
                (emailFinalList.length > 0) && (emailFinalList.map((val, ind) => {
                    return (<div key={ind} className='SubEmailLists'>
                        <div>{val.senderName}</div>
                        <div>{val.recieverName}</div>
                        <div>{modifyString(val.body)}</div>
                        <div>{val.time}</div>
                    </div>)
                }))
            }
        </div>
    )
}

export default EmailLists