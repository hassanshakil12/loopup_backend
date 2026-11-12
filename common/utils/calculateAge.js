const Boom = require("@hapi/boom");

const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);

  if (Number.isNaN(dob.getTime())) {
    throw Boom.conflict("Invalid date of birth");
  }

  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  const hasBirthdayOccurred =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasBirthdayOccurred) {
    age--;
  }

  return age;
};

module.exports = calculateAge;
