const express = require("express");
const router = express.Router();
const userData = require("../config/localData");

const User = require("../models/User");

router.get("/local", async (req, res) => {
  try {
    res.json(userData);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/local/search", async (req, res) => {
  const value = req.body.searchTerm;
  let newList = [];
  try {
    if (value.length > 0) {
      userData.forEach(item => {
        if (
          item.firstName.toLocaleLowerCase().includes(value)
          || item.lastName.toLocaleLowerCase().includes(value)
          || item.email.toLocaleLowerCase().includes(value)
        ) {
          newList.push(item);
        }
      });
    }

    // const result = userData.find(query => query.firstName === val || query.lastName === val);

    res.json(newList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/search", async (req, res) => {
  const query = {
    $or: [
      { firstName: req.body.searchTerm },
      { lastName: req.body.searchTerm },
    ],
  };
  console.log(query)
  try {
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
