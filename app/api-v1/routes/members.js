const logger = require('../../logger')
const { membershipReducer } = require('../../util/appUtil')
const { membersResponses, validateMembersResponse } = require('../validators/membersResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      try {
        const members = await apiService.findMembers()
        const result = await membershipReducer(members)

        const validationErrors = validateMembersResponse(400, result)

        if (validationErrors) {
          res.status(400).json(validationErrors)
          return
        } else {
          res.status(200).json(result)
          return
        }
      } catch (err) {
        logger.error(`Error getting members. Error was ${err.message || JSON.stringify(err)}`)
        if (!res.headersSent) {
          res.status(500).send(`Error getting members`)
          return
        }
      }
    },
  }

  doc.GET.apiDoc = {
    summary: 'Get members',
    responses: membersResponses,
    security: [{ bearerAuth: [] }],
    tags: ['members'],
  }

  return doc
}
