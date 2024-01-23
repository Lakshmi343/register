const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./userModel');

const app = express();
app.use(express.json());

const port = 4000;

const mongodb = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.error(err);
    });
};

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.get('/api/registered', async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();
    res.json({ users: allUsers });
  } catch (error) {
    next(error);
  }
});

app.post('/api/register', async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newUser = new UserModel({ name, email, password, phoneNumber });
    await newUser.save();

    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
});

app.put('/api/update/:id', async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const userId = req.params.id;

    await UserModel.findByIdAndUpdate(userId, { name, email, password, phoneNumber });

    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/delete/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;

    await UserModel.findByIdAndDelete(userId);

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

mongodb();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
