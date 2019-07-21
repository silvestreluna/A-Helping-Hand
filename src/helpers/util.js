import moment from 'moment';

const addDateAndTime = () => {
  const today = moment().format('LLL');
  return today;
};

export default { addDateAndTime };
