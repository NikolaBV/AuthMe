const app = require("express")();
const PORT = 8080;
app.listen(PORT, () => {
  console.log("Listening on port 8080");
});

app.get("/endpoint", (req, res) => {
  res.status(200).send({
    endpoint: "Exists",
    name: "example",
  });
});
