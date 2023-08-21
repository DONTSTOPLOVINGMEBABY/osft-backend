const express = require('express')
const router = express.Router()
const { 
    getUserProjects, 
    getUserFeatures, 
    getVariables,
    getApiKeys, 
} = require('../../controllers/Admin-Web-App/appQueries/projects')
const { ProtectAuthRoutes } = require('../../middlewares/auth')

router.get('/projects', ProtectAuthRoutes, getUserProjects)

router.get('/features', ProtectAuthRoutes, getUserFeatures)

router.get('/variables', ProtectAuthRoutes, getVariables)

router.get('/api-keys', ProtectAuthRoutes, getApiKeys)

module.exports = router 