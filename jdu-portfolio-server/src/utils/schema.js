const Joi = require('joi')

const studentSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    loginId: Joi.string().required(),
    password: Joi.string().required(),
    groupNumber: Joi.string().required(),
    // yearOfAdmission: Joi.alternatives(Joi.string().regex(/^\d+$/), Joi.number()).required(),
    courseNumber: Joi.alternatives(Joi.string().regex(/^\d+$/), Joi.number().min(1)).required(),
    avatar: Joi.string().uri(),
    bio: Joi.string(),
    email: Joi.string().email(),
    images: Joi.array().items(Joi.string().uri()),
    videos: Joi.array().items(Joi.string().uri()),
    specialisationId: Joi.string().uuid().required(),
})

const recruitorSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    loginId: Joi.string().required(),
    password: Joi.string().required(),
    companyName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    bio: Joi.string(),
    avatar: Joi.string().uri(),
    specialisation: Joi.string().required()
})

module.exports = {
    studentSchema,
    recruitorSchema
}