
export const get = (req, res) => {
    return res.render('home/index', {
        title: 'Home',
        session: {
            email: req.session.email,
            assoc_code: req.session.assoc_code,
            fullname: req.session.fullname
        }
    })
}