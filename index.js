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

app.get("/", async (req, res) => {
  let weeks = {};
  let query1 = `select * from Todolist where day = "Monday";`;
  try {
    const [results, fields] = await connection.query(query1);
    weeks["monday"] = results;
  } catch (err) {
    console.log(err);
  }

  res.render("index.ejs", { weeks: weeks });
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
