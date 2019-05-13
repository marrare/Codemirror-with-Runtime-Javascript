module.exports = (app) => {
  const HomeController = {
      
    paginaIndex: function(req, res) {
      res.render('index');
    }
    
  };
  return HomeController;
};