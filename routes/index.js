var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var path = require('path');
var json_file = path.join(process.cwd(), 'data', 'data.json');

function cachebust() {
  var rand = String(Math.random())
  return rand.substr(rand.length - 6);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(json_file);
    jsonfile.readFile(json_file, function(err, data) {
        data = data || {
            "title": "MyProject",
            "header": "Documentation",
            "one_liner": "Quick description about what this project is",
            "sections": [
                {
                    "id": 'i8d0ad9kww64j9k9',
                    "label": "Overview",
                    "identifier": "overview",
                    "position": 0,
                    "location": "overview",
                    "sub_sections": []
                }
            ],
            "content": {
                "overview": [
                    {
                        "id": "igggmcos1abawchy",
                        "position": 0,
                        "type": "text",
                        "content": "Welcome to DocBuilder!"
                    },
                ],
            }
        };
        res.render('index', {
            title: 'Express',
            cachebust: cachebust(),
            data: data
        });
    });
});

router.post('/data', function(req, res, next) {
    jsonfile.writeFile(json_file, req.body, {spaces: 4}, function(err) {
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            res.send(JSON.stringify({ "status": "error" }), 400);
        }

        res.send(JSON.stringify({ "status": "success" }), 200);
    });
});

module.exports = router;
