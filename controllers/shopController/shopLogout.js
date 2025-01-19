exports.shopLogout=(req,res,next)=>{
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Unable to log out');
    }
    // Redirect to the login page or home page
    res.redirect('/');
});
}