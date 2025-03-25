import express from "express";
import  qr from "qr-image"
import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port,(req,res)=>{
  console.log(`Server is running at port ${port}`);
})

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "public/index.html");
})

  app.get("/generate" , (req,res) =>{
    const q = req.query.q;

    if(!q ){
      return res.status(400).send("Bad Request : Missing Parameters");
    }

    res.setHeader('Content-disposition', 'attachment; filename="QR_CODE.png"'); // Download prompt
    res.setHeader('Content-Type', 'image/png');
    //Generate QR Code
    let qr_png = qr.image(q,{type : 'png' });

    
    //Save URL and name to a text file
    
    //Send QR code to frontend

    res.type('png');
    qr_png.pipe(res);
  })

    //Save QR Code , url and name into the file
    //qr_png.pipe(fs.createWriteStream("QR_GENERATOR.png"));
    // fs.writeFile('url_qr_code.txt',`URL: ${answer.URL}\nNAME : ${answer.name}`,(err)=>{
    //   if (err) throw err;
    //   console.log("URL of QR_CODE is saved successfully");
    // })
