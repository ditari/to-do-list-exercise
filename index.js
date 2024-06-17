import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "TestDatabase",
});

function getcurrenttime()
{
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let hh = "" + h;
  let mm = "" + m;
  if (h < 10) 
      hh = "0"+ h;
  if (m   <   10)
      mm = "0"+ m;
 let currenttime = hh + ":" +mm;
 return currenttime;
}

app.get("/", async (req, res) => {
  let weeks = {};
  let query1 = `select * from Todolist where day = "Monday";`;
  try {
    const [results, fields] = await connection.query(query1);
    weeks["monday"] = results;
  } catch (err) {
    console.log(err);
  }
  let query2 = `select * from Todolist where day = "Tuesday";`;
  try {
    const [results, fields] = await connection.query(query2);
    weeks["tuesday"] = results;
  } catch (err) {
    console.log(err);
  }
  let query3 = `select * from Todolist where day = "Wednesday";`;
  try {
    const [results, fields] = await connection.query(query3);
    weeks["wednesday"] = results;
  } catch (err) {
    console.log(err);
  }
  let query4 = `select * from Todolist where day = "Thursday";`;
  try {
    const [results, fields] = await connection.query(query4);
    weeks["thursday"] = results;
  } catch (err) {
    console.log(err);
  }
  let query5 = `select * from Todolist where day = "Friday";`;
  try {
    const [results, fields] = await connection.query(query5);
    weeks["friday"] = results;
  } catch (err) {
    console.log(err);
  }
  let query6 = `select * from Todolist where day = "Saturday";`;
  try {
    const [results, fields] = await connection.query(query6);
    weeks["saturday"] = results;
  } catch (err) {
    console.log(err);
  }

  let query7 = `select * from Todolist where day = "Sunday";`;
  try {
    const [results, fields] = await connection.query(query7);
    weeks["sunday"] = results;
  } catch (err) {
    console.log(err);
  }

  let date = new Date();
  let today = date.toLocaleDateString();
  let currenttime = getcurrenttime();

  res.render("index.ejs", { weeks: weeks, today:today, time:currenttime });
});



app.post("/delete", async (req, res) => {
  let id = req.body.delete_id;
  let query = `delete from Todolist where id = ${id};`;
  try {
    const [results, fields] = await connection.query(query);
  } catch (err) {
    console.log(err);
  }

  res.redirect("/");
});

app.post("/add", async (req, res) => {
  let newtask = req.body.newtask;
  let day = req.body.day;
  if (newtask.length > 0) {
    let query = `insert into Todolist(job, day) values ("${newtask}", "${day}");  `;
    try {
      const [results, fields] = await connection.query(query);
    } catch (err) {
      console.log(err);
    }
  }

  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  let edittask = req.body.newjob;
  let id = req.body.edit_id;
  let query = `update todolist set job="${edittask}" where id=${id};`;
  try {
    const [results, fields] = await connection.query(query);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
