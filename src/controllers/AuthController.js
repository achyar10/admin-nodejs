import admins from '../models/AdminModel'
import bcrypt from 'bcrypt'

export const get = (req, res) => {
    return res.render('login/login', {
        layout: false,
        title: 'Login',
        message: req.flash('error')
    })
}

export const login = async (req, res) => {
    const check = await admins.find({ email: req.body.email })

    if (check.length < 1) {
        req.flash('error', 'Email not register');
        res.redirect('/login');
    } else {
        bcrypt.compare(req.body.password, check[0].password, (error, result) => {
            if (error) {
                req.flash('error', 'Error processing request');
                res.redirect('/login');
            }
            if (result) {
                req.session.assoc_code = check[0].assoc_code
                req.session.email = req.body.email
                req.session.fullname = check[0].fullname
                res.redirect('/');
            } else {
                req.flash('error', 'Wrong Password!');
                res.redirect('/login');
            }

        })
    }
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
}