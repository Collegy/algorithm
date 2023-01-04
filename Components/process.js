const express = require("express");
const applicant = require("./applicant");
const app = express();
app.use(express.json());

app.get("/process/:id", async (req, res) => {
  try {
    const applicantImps = require("./applicant");
    const rankImps = require("./rank");
    const finalImps = require("./final");
    const id = req.params.id; //GETS ID FROM API CALL URL
    const applicant1 = await applicantImps.applicant(id);
    const rank2 = await rankImps.rankCols(id);
    const final3 = await finalImps.final(id);
    res.json(final3);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching item");
  }
});

app.listen(3000, () => {
  console.log("API server listening on port 3000");
});
