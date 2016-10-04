var express = require('express');
var router = express.Router();

function cachebust() {
  var rand = String(Math.random())
  return rand.substr(rand.length - 6);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', cachebust: cachebust() });
});

module.exports = router;
