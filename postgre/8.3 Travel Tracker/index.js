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
let countries = [];
// GET home page
app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");

  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  // db.end();
});
app.post("/add", async (req, res) => {
  try {
    console.log(req.body.country);
    let country = await db.query(
      `select country_code from countries where country_name = '${req.body.country}'`
    );
    if(country.rows.length !== 0)
      await db.query(
        `Insert into visited_countries (country_code) values ($1)`,
        [country.rows[0].country_code]
      );
      else      res.render("index.ejs", { countries: countries, total: countries.length , error : "Country Doesn't Exists " });


    res.redirect("/");
  } catch (err) {
    console.log(err);

  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
