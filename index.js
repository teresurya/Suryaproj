const http= require('http');
const fs= require('fs');
const path = require('path');
const {MongoClient} = require('mongodb');
const uri ="mongodb+srv://surya:1234@cluster0.vzd41ja.mongodb.net/";
const client = new MongoClient(uri);

const server   =http.createServer(async(req,res) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    
      
      };  
const connectDB=async()=>{
    try{
        await client.connect();
        console.log("Mongo DB is connected")
    
    }
    catch(e){
        console.log(e)
    }
}
connectDB();

console.log(req.url)
if(req.url === '/'){
    fs.readFile( path.join(__dirname,'public','index.html'),(err,data)=>{

    if (err) throw err;
    res.writeHead(200,{ 'Content-Type' : 'text/html'});
    res.end(data);
    }
 )
 
}

else if(req.url=='/api')
{

    const cursor = client.db("laptop").collection("laptop").find({});
    const results = await cursor.toArray();
    //console.log(results);
    const js= (JSON.stringify(results));
    res.writeHead(200,headers)
    console.log(js);
    res.end(js);

}
else{

    res.end("Eror 404")
}

}).listen(7004,()=>console.log("Great our server is running on 7004"));
 