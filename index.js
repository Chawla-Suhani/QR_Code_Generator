import {input} from "@inquirer/prompts";//import funciton input from library @inquirer/prompts
import  qr from "qr-image"
import fs from "fs";
import inquirer from 'inquirer';

// console.log(typeof inquirer);
inquirer
  .prompt([{
    /* Pass your questions in here */
    message:"Enter the url",
    name:"URL"
    },{
         message:"Enter your name",
    name:"name"
    }
  ])
  .then((answer) => {
    //console.log(answer);
    let qr_png = qr.image(answer.URL , {type : 'png'});
    qr_png.pipe(fs.createWriteStream('QR_GENERATED.png'));

    fs.writeFile('url_qr_code.txt',`URL: ${answer.URL}\nNAME : ${answer.name}`,(err)=>{
      if (err) throw err;
      console.log("URL of QR_CODE is saved successfully");
      
    })
  });

  
//console.log(ans);
/*************inquirer.prompt([]) returns a promise*********************/
// a Promise is used to handle tasks that take time, like fetching data from a server. It doesn’t give the result immediately but ensures that when the task is done, you get either:
// ✔ Success (resolved) → You get the data.
// ❌ Failure (rejected) → You get an error. 

// A Promise in JavaScript is an object that represents the future result of an asynchronous operation.
// It acts as a placeholder for a value that isn’t available immediately but will be resolved later.


  
// when the Promise is resolved (successfully completed) then .then() method is called








/********ANOTHER METHOD TO GENERATE QR CODE*************/

// const answer = await input({message:"Enter your url for which you want to generate QR Code"});

// fs.writeFile("save_url.txt",answer,(err)=>{
//     if(err) throw err;
//     console.log("URL saved successfully");
    
// });

// var urlQrCode = image(answer,{type:'png'});
// urlQrCode.pipe(fs.createWriteStream('NewQRCode.png'));
