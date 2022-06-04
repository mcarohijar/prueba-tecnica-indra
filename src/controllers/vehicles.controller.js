async function get(req, res, next) {
  try {
      res.json({ lala: 'asd' });
  } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json({ lala: 'asd' });
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
}

/*

import dbConnection from 'src/configs/db.config.js';
const USERS_TABLE = process.env.USERS_TABLE;

// Get User endpoint
app.get('/users/:userId', function (req, res) {
  console.log({USERS_TABLE});
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };
  dbConnection.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const { userId, name } = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// Create User endpoint
app.post('/users', function (req, res) {
  const { userId, name } = req.body;
  console.log({ USERS_TABLE });
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  dbConnection.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ userId, name });
  });
}) */