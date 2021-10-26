
var mail;
var token;

async function sentMails(ml,tk){
    mail = ml;
    token = tk;

    //fetching data for all the messages
    const data = await fetch('https://gmail.googleapis.com/gmail/v1/users/'+mail+'/messages?access_token='+token);
    const data1 = await data.json();
    console.log(data1);
    let array_Id = []

    for(var key in data1){
     
        if(key=='messages'){
            let arr = data1[key];
            for(var i=0;i<arr.length;i++){
                let value = arr[i];
                for(var l in value){
                    if(l=='id'){
                        array_Id.push(value[l]);   //collecting all the ids of the mails
                    }
                }
            }
        }
    }
    
    for(var i=0;i<array_Id.length;i++){

        const data = await fetch('https://gmail.googleapis.com/gmail/v1/users/'+mail+'/messages/'+array_Id[i]+'?access_token='+token);
        const data1 = await data.json();
     
        for(var key in data1){
          
       
            if(key== 'labelIds'){
                    var label = data1[key];
     
                    for(var i=0;i<label.length;i++){
                        if(label[i] == 'SENT'){
                            console.log(label);
                        }
                    }
                
            
            }
        }
    }
}







async function getProfile(ml,tk){

    //function to list all the mails in the inbox of the user
    //Accessing all the messages of the user
    mail = ml;
    token = tk;
    const data = await fetch('https://gmail.googleapis.com/gmail/v1/users/'+mail+'/messages?access_token='+token);
    const data1 = await data.json();
  
    let array_Id = []

    //Collecting all the ids of the mails
    for(var key in data1){
     
        if(key=='messages'){
            let arr = data1[key];
            for(var i=0;i<arr.length;i++){
                let value = arr[i];
                for(var l in value){
                    if(l=='id'){
                        array_Id.push(value[l]);   
                    }
                }
            }
        }
    }
  
    
    let mails = document.querySelector('.mail');
    mails.innerHTML = '';
    for(var i=0;i<array_Id.length;i++){

        const data = await fetch('https://gmail.googleapis.com/gmail/v1/users/'+mail+'/messages/'+array_Id[i]+'?access_token='+token);
        const data1 = await data.json();

        //Display the mail corresponding to each id.
    
        for(var key in data1){
            
         
        
         if(key=='snippet'){
           
            mails.innerHTML+=`<div class='inner-mail' onclick="newfunc()"><div>${data1[key].slice(0,125)}</div></div>`
           }
        }
    }


   
}


async function displayDrafts(ml,tk){
    mail = ml;
    token = tk;
    //Function to get all the draft messages.
    const data = await fetch('https://gmail.googleapis.com/gmail/v1/users/'+mail+'/drafts?access_token='+token);
    
    const data1 = await data.json();
    
    console.log('testing drafts...');
    let Draft_Ids = [];
    for(var key in data1){
       if(key=='drafts'){
           let items = data1[key];
            for(let i=0;i<items.length;i++){
                 Draft_Ids.push(items[i].id);   //storing all the draft ids
                
            }
       }
    }
let all_messages = []

    //display drafts corresponding to each Id
    for(var i=0;i<Draft_Ids.length;i++){
        const data = await fetch("https://gmail.googleapis.com/gmail/v1/users/"+mail+"/drafts/"+Draft_Ids[i]+"?access_token="+token);
    
        const data1 = await data.json();
    
        for(var key in data1){
            if(key == 'message'){
                let finalData = data1[key];
                for(var key1 in finalData){
                        
                        
                        if(key1 == 'snippet'){
                            all_messages.push(finalData[key1]);   
                        }
                        
                  
                }
            }
        }
    }
    
    //displaying all the messages corresponding to the drafts
    let mails = document.querySelector('.mail');
    mails.innerHTML = "";
    for(let i=0;i<all_messages.length;i++){
        
        mails.innerHTML+=`<div class='inner-mail id-${i}'><div class='draft'><span>Draft</span></div><span class='no-subject'></span><div>${all_messages[i].slice(0,100)}</div></div>`
       
        
    }
   

}





