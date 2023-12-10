const express = require('express');
const moment = require('moment');

const router = express.Router();

router.get('/healthcheck', (req, res) => {
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

  const status = 'Service is up and running';

  const response = {
    date: formattedDate,
    status: status,
  };

  res.status(200).json(response);
});

module.exports = router;
