import admins from '../models/AdminModel'

export const get = (req, res) => {
    admins.find().exec((err, user) => {
        if (err) {
            return res.status(400).json({
                status: false,
                result: err
            })
        }
        return res.render('user/index', { 
            title: 'User List',
            data: user 
        }) 
    })
}