const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


var data = [];

var dummyData =
{
    "imageUrl": "https://www.mccain.com/SiteCollectionImages/McCainCorporate/goodfood-products/McCain-Breakfast-Potato-Pancakes.png",
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "price": 1002.99
};

for (var i = 1; i < 51; i++) {
    var temp = JSON.parse(JSON.stringify(dummyData));
    temp.id = i;
    temp.title = "item (" + temp.id.toString() + ")"
    data.push(temp);
}
// simple router to let all have prefix "rest"
var router = express.Router();

app.use(function (req, res, next) {
    console.log(Date.now() + ": " + req.method + " for " + req.url);
    setTimeout(function () {
        next();
    }, 300);
});

app.use('/api', router);

// Hello World!
app.get('/', function (req, res) {
    res.send('Hello World');
})

// create a GET route
router.get('/product', (req, res) => {
    var ret;
    if (req.query.id != null) {
        ret = data.find(e => e.id == req.query.id);
    } else {
        ret = data;
    }
    res.send(ret);
});

router.delete('/product', function (req, res) {
    let id = req.query.id;
    if (id == null) {
        res.send({
            "status": "failed",
            "error": "id not passed"
        });
    }
    let index = data.findIndex(e => e.id == id);

    if (index == -1) {
        res.send({
            "status": "failed",
            "error": "id (" + id + ") not found"
        });
    }
    ret = data.splice(index, 1);
    res.send({ "status": "success" });
});