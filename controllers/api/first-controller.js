const { queryByApiKey } = require('../../helpers/common-queries/project-queries')
const { QueryVariablesById } = require('../../helpers/common-queries/variable-queries')
const { BadApiKeyError } = require('../../helpers/common-error-messages')
const { setCache } = require('../../helpers/Cache-Helpers')
const {
    QueryDevelopmentFeatures, 
    QueryProductionFeatures, 
} = require('../../helpers/common-queries/feature-queries')
const { 
    isProductionKey, 
    isDevelopmentKey
} = require('../../helpers/Api-Key-Helpers')
const {
    FlattenFeatures, 
    BuildPayload, 
} = require('../../helpers/Payload-Helpers')
 


async function load_entire_project (req, res) {
    try {
        let apiKey = req.apiKey
        let project = await queryByApiKey(apiKey)
        if (!project) {
            return BadApiKeyError(res)
        }
        let features
        if (isProductionKey(apiKey)){
            features = await QueryProductionFeatures(apiKey, project._id)
        } 
        else if (isDevelopmentKey(apiKey)){
            features = await QueryDevelopmentFeatures(apiKey, project._id)
        }
        else {
            return BadApiKeyError(res)
        }
        features = FlattenFeatures(features)
        let variables = await QueryVariablesById(features)
        let payload = BuildPayload(variables)
        setCache(apiKey, payload.last_updated)
        res.json(payload)
    } catch (error) {
        res.status(500)
        console.error(error)
    }
}

module.exports = {
    load_entire_project, 
}


