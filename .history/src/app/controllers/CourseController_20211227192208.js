const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class Coursecontroller {
    //Get // Courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    //Get // Courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //post // Courses/store
    store(req, res, next) {
        const formData= req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(error => {

            });
    }


    //Get // Courses/:id/edit
    edit(req, res, next) {
            Course.findById(req.params.id)
                .then(course => res.render('courses/edit', {
                    course: mongooseToObject(course)
                }))
                .catch(next);
        }
        //put // Courses/:id
    update(req, res, next) {
            Course.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/me/stored/courses'))
                .catch(next);
        }
        //delete // Courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //delete // Courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //patch // Courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


}

//GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD
module.exports = new Coursecontroller();