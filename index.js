const express = require('express');
const app = express();
const router = express.Router();
const port = 8080;


const tractors = [
    {
        id: '1',
        name: 'John Green 506LD 4WD',
        description: 'The perfect fit for all kinds of work you do', 
        imgUrl: 'https://ubisafe.org/images/tractor-vector-green-3.png'
    },
    {
        id: '2',
        name: 'Ursus Orange WK1 200HP',
        description: 'Cheap and solid.', 
        imgUrl: 'https://openclipart.org/download/269624/trator.svg'
    },
    {
        id: '3',
        name: 'Yellow Digger 77QA',
        description: 'Do you have a hole to digg? This one is all you need',
        imgUrl: 'https://openclipart.org/download/281814/Tractor2.svg'
    },
    {
        id: '4',
        description : 'Beauty Queen of the torques',
        name: 'Ocean Blue 40WP/1',
        imgUrl: 'https://i1.wp.com/clipartaz.com/wp-content/uploads/2017/02/tractor-clipart-free-vector-graphics-freevectors-400x360.jpg?fit=450,300&zoom=2&strip=all'
    }

    

    
]

const getTractor = (id) => {
    for (var i = 0, len = tractors.length; i < len; i++) {
        if(tractors[i].id == id){
            return tractors[i];
        }
      }
    return null;
};

// url: http://localhost:8080/
app.get('/', (request, response) => response.send('OK'));

// all routes prefixed with /api
app.use('/api', router);

  // this array is used for identification of allowed origins in CORS
  const originWhitelist = [
    'https://dist-i303803trial.dispatcher.hanatrial.ondemand.com',
    'https://luigidemosapui5-i303803trial.dispatcher.hanatrial.ondemand.com',
    'http://localhost:4200',
    'http://localhost:8080'
];

  // middleware CORS handling route that all requests pass through
  router.use((request, response, next) => {
    let origin = request.headers.origin;
    
    if (originWhitelist.indexOf(origin) > -1) {
      response.setHeader('Access-Control-Allow-Origin', origin);
    }
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

router.get('/tractors', (request, response) => {
    response.json(tractors);
});

router.get('/tractors/:id', (request, response) => {
    var tractorId = request.params.id;
    var tractor = getTractor(tractorId);
    if(tractor){
        response.status(200).send(tractor);
    } else {
        response.status(404).send("No tractor found");
    }

});




// set the server to listen on port 8080
app.listen(port, () => console.log(`Listening on port ${port}`));