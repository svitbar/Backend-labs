const moment = require('moment-timezone');

const healthCheck = (req, res) => {
  const timeZone = 'Europe/Kiev';
  const currentDate = moment().tz(timeZone);
  const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');

  const status = 'Service is up and running';

  const response = {
    date: formattedDate,
    status: status,
  };

  res.status(200).json(response);
};

module.exports = healthCheck;
