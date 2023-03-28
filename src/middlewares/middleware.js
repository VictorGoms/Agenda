exports.middlewareGlobal = (req, res, next) =>{
   res.locals.error = req.flash('error');
   res.locals.success = req.flash('success');
   res.locals.user = req.session.user;
   next();
}

exports.checkCsrfError = (err, req, res, next)=>{
    if (err && 'EBADCSRFTOKEN' === err.code){
        return res.render('404.ejs');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
} 

exports.loginRequired = (req, res, next) =>{
    if(!req.session.user){
        req.flash('error', 'Você precisa fazer login.');
        req.session.save(()=> res.redirect('/'));
        return;
    }
    next();
};

