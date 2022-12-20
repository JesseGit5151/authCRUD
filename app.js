const express = require('express');
const dotenv = require("dotenv");
const app = express();



dotenv.config({ path: "config.env" });
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is running on http:/localhost:${PORT}`);
  });
