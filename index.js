const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;
const Schema = mongoose.Schema;

const stuSchema = new Schema(
  {
    name: { type: String, required: true },
    studentID: { type: Number, required: true },
  }
);

const Student = mongoose.model("w24students", stuSchema);
app.get('/', (req, res) => {
  url = '';
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  try {


    const url = await req.body.myuri;

    console.log(url);
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Connected!');
      })
      .catch((err) => {
        console.log('Failed to Connected ' + err);
      });

   
    const student = new Student(
      {
        name: "Yang Yi-Sin",
        studentID: 300368638
      })

    console.log()

    Student.insertMany([student])
    await res.send(`<h1>Document  Added</h1>`);

  }
  catch (err) {
    console.log("Errors message: " + err)
  }
});

app.listen(port, () => {
  console.log(`Servers is running on port: ${port}`);
});
