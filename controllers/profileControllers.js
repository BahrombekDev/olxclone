const User = require('../models/userModel')
//@route      GET/profile/:username
//@desc       Users profila page
//@access     Private

const getProfilePage = async(req,res) =>{
    try {
        const user = await User
        .findOne({username : req.params.username})
        .populate('posters')
        .lean()
        if(!user) throw new Error('User is not invaild')
        console.log(user.posters);
        res.render('user/profile',{
            title: `${user.username}`,
            user,
            isAuth:req.session.isLogged,
            url:process.env.URL
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getProfilePage,
}