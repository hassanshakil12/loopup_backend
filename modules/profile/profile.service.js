const _ = require("lodash");

// Services
const userService = require("../user/user.service");

// Repositories
const profileRepository = require("./profile.repository");

// Validations
const joi = require("../../configs/joi");
const joiSchema = require("./profile.schema");
const profileValidation = require("./profile.validation");
const userValidation = require("../user/user.validation");

exports.getAllProfiles = async (filters) => {
  return profileRepository.getAllProfiles(filters);
};

exports.getProfilesWithPagination = async (payload) => {
  const { filters, page, pageSize, sort } = payload;
  const offset = (page - 1) * pageSize;

  const [profiles, profilesCount] = await Promise.all([
    profileRepository.getProfilesWithPagination(
      filters,
      offset,
      pageSize,
      sort,
    ),
    profileRepository.getProfilesCount(filters),
  ]);

  const meta = {
    page,
    pageSize,
    totalPages: Math.ceil(profilesCount / pageSize),
    totalCount: profilesCount,
  };

  return { data: profiles, meta };
};

exports.getProfileById = async (id) => {
  joi.validate(id, joiSchema.getProfileById);

  return profileValidation.throwErrorIfProfileDoesNotExist(id);
};

exports.createProfile = async (payload) => {
  const validatedPayload = joi.validate(payload, joiSchema.createProfile);

  await userValidation.throwErrorIfUserDoesNotExist(validatedPayload.user);

  validatedPayload.age = calculateAge(validatedPayload.dateOfBirth);

  return profileRepository.createProfile(validatedPayload);
};

exports.updateProfile = async (payload) => {
  const validatedPayload = joi.validate(payload, joiSchema.updateProfile);

  const existingProfile =
    await profileValidation.throwErrorIfProfileDoesNotExist(
      validatedPayload.id,
    );

  const updatePayload = {};

  if (
    validatedPayload.title &&
    validatedPayload.title !== existingProfile.title
  ) {
    updatePayload.title = validatedPayload.title;
  }

  if (validatedPayload.age && validatedPayload.age !== existingProfile.age) {
    updatePayload.age = validatedPayload.age;
  }

  if (
    validatedPayload.dateOfBirth &&
    validatedPayload.dateOfBirth !== existingProfile.dateOfBirth
  ) {
    updatePayload.dateOfBirth = validatedPayload.dateOfBirth;
  }

  if (
    validatedPayload.gender &&
    validatedPayload.gender !== existingProfile.gender
  ) {
    updatePayload.gender = validatedPayload.gender;
  }

  if (
    validatedPayload.phone &&
    validatedPayload.phone !== existingProfile.phone
  ) {
    updatePayload.phone = validatedPayload.phone;
  }

  if (validatedPayload.bio && validatedPayload.bio !== existingProfile.bio) {
    updatePayload.bio = validatedPayload.bio;
  }

  if (
    validatedPayload.addresses &&
    !_.isEqual(validatedPayload.addresses, existingProfile.addresses)
  ) {
    updatePayload.addresses = validatedPayload.addresses;
  }

  if (
    Object.hasOwn(validatedPayload, "isPublic") &&
    validatedPayload.isPublic !== existingProfile.isPublic
  ) {
    updatePayload.isPublic = validatedPayload.isPublic;
  }

  if (!Object.keys(updatePayload).length) return existingProfile;

  return profileRepository.updateProfile(validatedPayload.id, updatePayload);
};

// TODO: Look into it for more better approach
exports.deleteProfile = async (id) => {
  joi.validate(id, joiSchema.getProfileById);

  const profile = await profileValidation.throwErrorIfProfileDoesNotExist(id);

  await userService.deleteUser(profile.user._id);
  await profileRepository.deleteProfile(id);

  return { deletedId: id };
};
