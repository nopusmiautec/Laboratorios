exports.getHome = (req, res) => {
    res.render('home', {
      pageTitle: 'Inicio',
      path: '/'
    });
  };
  
  exports.getAbout = (req, res) => {
    res.render('about', {
      pageTitle: 'Acerca de',
      path: '/about'
    });
  };