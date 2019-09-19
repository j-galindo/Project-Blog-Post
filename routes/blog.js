const express = require('express');
const router = express.Router();
const Blog = require('../models/blog')
    // const Celebrity = require('../models/celebrity')

router.get('/blogs', (req, res, next) => {

    if (!req.user) {

        req.flash('error', 'please log in ')
        res.redirect('/login')
    }
    Blog.find()
        .then((allBlogs) => {
            console.log(allBlogs)
            allBlogs.forEach((eachBlog) => {
                if (eachBlog.creator.equals(req.user._id)) {
                    eachBlog.mine = true
                }
            })
            res.render('movies/index', { blogs: allBlogs })
        })
        .catch((err) => {
            next(err);
        })
})

router.get('/blogs/details/:theid', (req, res, next) => {
    let id = req.params.theid

    Blog.findById(id)
        .then(() => {

            res.render('blogs/details', )
        })
        .catch((err) => {
            next(err);
        })
})


////////////////ROUTE FOR CREATING A NEW POST BUT MUST BE LOGGED IN///////////////////
// router.get('/new', (req, res, next) => {
//     if (!req.user) {
//         req.flash('error', 'SORRY ARE NOT LOGGED IN')
//         res.redirect('/login')
//     }
//     .then(() => {
//             res.render('movies/new');
//         })
//         .catch((err) => {
//             next(err)
//         })
// })

router.post('/blog/creation', (req, res, next) => {

    let title = req.body.theTitle;
    let brief = req.body.theBrief
    let message = req.body.theMessage;
    // let plot = req.body.thePlot;


    Blog.create({
            title: title,
            brief: brief,
            message: message,
            // plot: plot,
            creator: req.user
        })
        .then(() => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            next(err);
        })
})

router.post('/blogs/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Blog.findByIdAndRemove(id)
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/blogs/editblog/:id', (req, res, next) => {
    let id = req.params.id;

    Blog.findById(id)
        .then(() => {
            res.render('movies/edit', data);
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/blogs/update/:id', (req, res, next) => {

    let id = req.params.id;

    Blog.findByIdAndUpdate(id, {

            title: req.body.theTitle,
            brief: req.body.theBrief,
            message: req.body.theMessage,


        })
        .then(() => {
            res.redirect('/movies/details/' + id)
        })
        .catch((err) => {
            next(err);
        })

})



module.exports = router;