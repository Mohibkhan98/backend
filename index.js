const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const classifiedRoutes = require('./routes/classifiedRoutes');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error', err));

app.use('/api/classifieds', classifiedRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
