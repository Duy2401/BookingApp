const calculateDateDifference = (checkin, checkout) => {
  // Parse dates to JavaScript Date objects
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  // Ensure both dates are valid
  if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
    console.error("Invalid date format.");
    return 0;
  }

  // Calculate difference in milliseconds
  const differenceInMillis = checkoutDate - checkinDate;

  // Convert milliseconds to days
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const differenceInDays = Math.round(differenceInMillis / millisecondsInDay);

  return differenceInDays;
};
export default calculateDateDifference;
