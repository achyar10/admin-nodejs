import express from 'express'

import * as admin from './controllers/AdminController'
import * as auth from './controllers/AuthController'
import * as home from './controllers/HomeController'

const route = express.Router()

// auth
route.route('/login').get(checkLogin, auth.get)
route.route('/login').post(checkLogin, auth.login)
route.route('/logout').get(checkSession, auth.logout)

// Home
route.route('/').get(checkSession, home.get)

// User
route.route('/admin').get(admin.get)


function checkSession(req, res, next) {
    if (!req.session.email) {
        res.redirect('/login')
    } else {
        next()
    }
}

function checkLogin(req, res, next) {
    if (req.session.email) {
        res.redirect('/')
    } else {
        next()
    }
}

export default route