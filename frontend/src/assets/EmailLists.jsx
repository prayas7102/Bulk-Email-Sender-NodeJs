import React from 'react'

const EmailLists = () => {
    const emailList=[];
    async function getList() {
        emailList = await axios.get("http://localhost:5000/api/user/get-email");
    }
    getList();
    return (
        <div>
            {
                (!emailList.length) && (emailList.map((val,ind)=>{
                    <div key={ind}>{val}</div>
                })) 
            }
        </div>
    )
}

export default EmailLists