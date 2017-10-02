var express = require('express');
var router = express.Router();

const heroes = [
      { id: 0,  name: 'Zero' },
      { id: 1, name: 'Mr. Nice' },
      { id: 2, name: 'Narco' },
      { id: 3, name: 'Bombasto' },
      { id: 4, name: 'Celeritas' },
      { id: 5, name: 'Magneta' },
      { id: 6, name: 'RubberMan' },
      { id: 7, name: 'Dynama' },
      { id: 8, name: 'Dr IQ' },
      { id: 9, name: 'Magma' },
      { id: 10, name: 'Tornado' }
    ];

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});    
    
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/heroes', function(req, res){
    res.send(heroes).status(200);
});

router.post('/api/heroes', function(req, res){
    var heroId = heroes.length;
    var heroName = req.body.name;

    if(heroName){ 
        var newHero = {id:heroId, name: heroName};
        heroes.push(newHero);  
        res.send(newHero).status(200);    
    } else {
         res.send({msg: "Unable to save hero"}).status(500);
    }         
});

router.put('/api/heroes/:id', function(req, res){
    var heroId = req.params.id;
    var heroName = req.body.name;
    
    if(heroId && heroName && heroId < heroes.length){
        var newHero = {id:heroId, name: heroName};
        heroes [heroId] =  newHero; 
        res.send(newHero).status(200);         
    } else {
        res.send({msg: "Unable to update hero"}).status(500);
    }      
});


router.get('/api/heroes/:id', function(req, res){
    var heroId = req.params.id;
    
    if(heroId < heroes.length )
        res.send(heroes[heroId]).status(200);
    else
        res.send({msg: "Check your id"}).status(500);
});

router.delete('/api/heroes/:id', function(req, res){
    var heroId = req.params.id;
    
    if(heroId < heroes.length ){
        var lostHero = heroes[heroId];
        heroes.splice(heroId, 1)
        res.send(lostHero).status(200);
    } else {
        res.send({msg: "Check your id"}).status(500);
    }
});

router.all('*',function (req, res){
    res.send({msg: "This end point does not exist"}).status(500);
})

module.exports = router;
