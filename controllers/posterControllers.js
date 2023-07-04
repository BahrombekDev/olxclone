const Poster = require('../models/posterModel')
const User = require('../models/userModel')
//@route     GET /posters
//@desc      GET all posters
//@access    Public

const getPostersPage = async(req,res)=>{
    try {
        const posters = await Poster.find().lean()
        res.render('poster/posters',{
            title: 'Poster Page',
            posters: posters.reverse(),
            user:req.session.user,
            url: process.env.URL
        })
    } catch (err) {
        console.log(err);
    }
   
}

//@route     GET /posters/:id
//@desc      GET one posters by id
//@access    Public 
const getOnePoster = async (req,res) => {
    try {
        const poster = await Poster
        .findByIdAndUpdate(req.params.id, { $inc: { visits: 1}},{ new: true})
        .populate('author', ['_id', 'username'])
        .lean()
        res.render('poster/one',{
            title: poster.title,
            user:req.session.user,
            url:process.env.URL,
            poster,
            author: poster.author.username
    
        })
    } catch (error) {
        console.log(error);
    }
  
}

//@route     GET /posters/add
//@desc      GET addding posters
//@access    Private
const addNewPosterPage = (req,res) => {
    res.render('poster/add-poster',{
        title:'Yangi e`lon qo`shish',
        user:req.session.user,
        url:process.env.URL
    })
}

//@route      POST /posters/add
//@desc       Add new poster
//@access     Private
const addNewPoster = async (req, res) => {
    try {
      const newPoster = new Poster({
        title: req.body.title,
        amount: req.body.amount,
        region: req.body.region,
        // category: req.body.category,
        description: req.body.description,
        image: 'uploads/' + req.file.filename,
        author: req.session.user._id
      })
  
      await User.findByIdAndUpdate(req.session.user._id, 
        { $push: { posters: newPoster._id } }, 
        { new: true, upsert: true })
      
      await newPoster.save((err, posterSaved) => {
        if(err) throw err
        const posterId = posterSaved._id
        res.redirect('/posters/' + posterId)
      })
    } catch (err) {
      console.log(err)
    }
  }

//@route     POST /posters/:id/edit
//@desc     Get edit poster page
//@access    Private (Own)

const getEditPosterPage = async (req,res) => {
    try {
        const poster = await Poster.findByIdAndUpdate(req.params.id).lean()
        res.render('poster/edit-poster',{
            title: 'Edit page',
            url:process.env.URL,
            poster
        })
    } catch (error) {
        console.log(error);
    }

}

const updatePoster = async (req,res) => {
    try {
        const updatePosterOne=await Poster.findOne({_id:req.params.id})
        console.log('sss', updatePosterOne);
        console.log('req', req.body);
        const editedPoster = {
            title:  req.body.title ?? updatePosterOne.title ,
            amount:  req.body.amount  ?? updatePosterOne.amount,
            image:   req.body.image ?? updatePosterOne.image,
            region: req.body.region ?? updatePosterOne.region,
            describe:req.body.describe ?? updatePosterOne.describe
        }
        await Poster.findByIdAndUpdate(req.params.id, editedPoster).lean()
        res.redirect('/posters')
    } catch (error) {
        console.log(error);
    }
}

//@route     POST /posters/:id/delete
//@desc      Deleted poster by id
//@access    Private (Own)
const deletePoster = async (req,res) => {
    try {
        await Poster.findByIdAndRemove(req.params.id)
        res.redirect('/posters')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getPostersPage,
    getOnePoster,
    addNewPosterPage,
    addNewPoster,
    getEditPosterPage,
    updatePoster,
    deletePoster
}