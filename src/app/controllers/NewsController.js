class Newscontroller {
  //[GET] /news
  index(req, res) {
    res.render('news');
  }

  show(req, res) {
    res.send('DETAILL');
  }
}

module.exports = new Newscontroller();
