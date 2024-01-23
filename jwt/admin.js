const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

const User = mongoose.model('User', {
   username: String,
   password: String,
});

const mongodb = () => {
   mongoose.connect("mongodb://127.0.0.1:27017/demo", { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;

   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', () => {
      console.log("Database connected");
   });
};

app.post("/signup", async (req, res) => {
   const { username, password } = req.body;

   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });

      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
   } catch (error) {
      res.status(500).json({ message: "Error creating user" });
   }
});

app.post("/login", async (req, res) => {
   const { username, password } = req.body;

   try {
      const user = await User.findOne({ username });

      if (!user) {
         return res.status(401).json({ message: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         return res.status(401).json({ message: "Invalid username or password" });
      }

      res.status(200).json({ message: "Login successful" });
   } catch (error) {
      res.status(500).json({ message: "Error during login" });
   }
});

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
   mongodb();
});







