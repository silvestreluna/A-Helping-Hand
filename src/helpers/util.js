import moment from 'moment';

const addDateAndTime = () => {
  const today = moment().format('LL');
  return today;
};

export default { addDateAndTime };
