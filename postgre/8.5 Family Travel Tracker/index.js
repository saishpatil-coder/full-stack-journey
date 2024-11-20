import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3001;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Sai1234@@",
  port: 3000,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;
let users 
let currentColor
async function getUsers() {
  let q = `SELECT * FROM users`;
  users = (await db.query(q)).rows;
  //console.log(users)
  currentColor = users.find((ele)=>ele.id == currentUserId).color
  console.log(currentUserId ,  currentColor)
}

async function checkVisisted() {
  //console.log("current:" , currentUserId)
  const result = await db.query(
    `SELECT country_code FROM visited_countries where user_id = ${currentUserId}`
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  await getUsers();
  const countries = await checkVisisted();
  //console.log(countries)
  console.log(currentColor)
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentColor ? currentColor : "teal",
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  //console.log(input);
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    //console.log(data);
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code , user_id) VALUES ($1,$2)",
        [countryCode, currentUserId]
      ); 
      res.redirect("/");
    } catch (err) {
      //console.log(err); 
    }
  } catch (err) {
    //console.log(err); 
  } 
});
app.post("/user", async (req, res) => {
  let { user, add } = req.body;
  //console.log(req.body);
  if (user) {
    currentUserId = user;
    res.redirect("/");
  } else if (add) {
    res.render("new.ejs");
  } else {
    //console.log("err");
  }
});

app.post("/new", async (req, res) => {
  try {
    let { name, color } = req.body;

    let q = `INSERT INTO users (name,color) VALUES ($1,$2)`;
    await db.query(q, [name, color]);
    res.status(201).redirect("/");
  } catch (err) {
    //console.log(err);
    res.status(500).redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
