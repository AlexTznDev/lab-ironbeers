const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get("/beers", (req, res) => {
  punkAPI
  .getBeers()
  .then(beersArr => {
    console.log('Beers from the database: ', beersArr)
    res.render("beers.hbs", {beersArr})
  })
  .catch(error => console.log(error));
})

app.get("/random-beer",(req, res)=>{
  punkAPI
  .getRandom()
  .then(randomBeerApi => {
    
    res.render("random-beer.hbs", {randomBeerApi})
  })
  .catch(error => console.log(error));
})

app.get("/beers/:beer", (req, res)=>{
console.log(req.params.beer)
punkAPI.getBeer(req.params.beer)
.then(beer => {
  console.log(beer)
  res.render("oneBeer.hbs", {beer})
})
.catch(error => console.log(error))

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
