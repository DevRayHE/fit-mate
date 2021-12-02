const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    console.log(req.session);
    if (!req.session.userID) {
      res.redirect('/login')
    } else {
      next();
    }
  };
  
  module.exports = withAuth;