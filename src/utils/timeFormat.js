import moment from 'moment';

// without tansfering to 'day'
const timeFormat = (milliseconds) => {
  let hours = moment.duration(milliseconds, 'milliseconds').asHours().toFixed(1).split('.')[0];
  // if hours < 10, fix hours to 2 digits
  if (hours.length < 2) hours = `0${hours}`;
  const minutesAndSeconds = moment().startOf('day').seconds(milliseconds/1000).format('mm:ss');
  return `${hours}:${minutesAndSeconds}`;
}

export default timeFormat;