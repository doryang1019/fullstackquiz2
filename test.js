const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  try{


  const newURL = await req.body.myuri

  console.log(newURL);


   mongoose
      .connect(newURL, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(()=>{
          console.log('connected to mongo')
      })
      .catch((err)=>{
          console.log('Error Connecting to MongoDB ' +err)
      });

      const Schema = mongoose.Schema

      const studentSchema = new Schema(
          {
              name:{type:String, required: true},
              studentID: {type:Number, required:true},
          }
      )

      const Student = mongoose.model("w24students", studentSchema)




      const newStudent = new Student(
        {name:"Yang Yi-Sin",
        studentID:300368638})

        console.log()

      Student.insertMany([newStudent])
  //---




  // add the data to the database

  // send a response to the user
      await res.send(`<h1>Document  Added</h1>`);

  }
  catch(err){
    console.log("Errors message")
    // res.status(500).json({message: err.message})
  }
});

app.listen(port, () => {
  console.log(`Servers is running on port: ${port}`);
});
