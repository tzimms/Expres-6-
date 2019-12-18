  
const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const connection = require('./conf.js')

app.use(express.json());
app.use(express.urlencoded());
app.use('/', router);
app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened....');
  }
  console.log(`Server is listening on ${port}`);
});

router.get('/', (request, response) => {
  response.send('Welcome to fruit database go to /api/stock to see the fruits');
});
//Delet an entity
router.delete('/api/stock/del/:id', (req, res) => {
  const idStock = req.params.id;
  connection.query(`DELETE FROM stock WHERE id = ?`, [idStock], (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.sendStatus(200);
    }
  });
});

// DELETE packaged
router.delete('/api/stock/del/packaged', (req, res) => {
  connection.query('DELETE FROM stock WHERE packaged=0', (err, results) => {
    if (err) {
      res.status(500).json ({error: err});
    } else {
      res.sendStatus(200);
    }
  });
});


//PUT toggle a boolean
router.put('/api/stock/packaged/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`UPDATE stock SET packaged = !packaged WHERE id=?`, id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});


//PUT Mod of an entity
router.put('/api/stock/:id', (req, res) => {
  const idStock = req.params.id;
  const formData = req.body;
  connection.query('UPDATE stock SET ? WHERE id = ?', [formData, idStock], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error editing a fruit");
    } else {
      res.sendStatus(200);
    }
  });
});

//POST 
router.post('/api/stock', (req, res) => {
  const formdata = req.body;
  console.log(formdata);
  connection.query('INSERT INTO stock SET ?', formdata, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving more stock');
    } else {
      res.sendStatus(200);
    }
  });
}); 



// asc/des
router.get('/api/stock/asc', (req, res) => {
  connection.query(`SELECT * from stock ORDER BY type asc`, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving');
    } else {
      res.json(results);
    }    
  });
});

router.get('/api/stock/desc', (req, res) => {
  connection.query(`SELECT * from stock ORDER BY type desc`, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving');
    } else {
      res.json(results);
    }    
  });
});



//Expiration GREATER THAN date
router.get('/api/stock/expireby', (req, res) => {
  connection.query(`SELECT * from stock WHERE expiration > '2021-07-15'`, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving stock that stars with p');
    } else {
      res.json(results);
    }    
  });
});


// STARTS WITH 
router.get('/api/stock/p', (req, res) => {
  connection.query(`SELECT * from stock WHERE type LIKE 'p%'`, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving stock that stars with p');
    } else {
      res.json(results);
    }    
  });
});


//CONTAINS 
router.get('/api/stock/pp', (req, res) => {
  connection.query(`SELECT * from stock WHERE type LIKE '%pp%'`, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving stock that contains pp');
    } else {
      res.json(results);
    }    
  });
});

// ALL Data 
router.get('/api/stock', (req, res) => {
  connection.query('SELECT * from stock', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving stock');
    } else {
      res.json(results);
    }    
  });
});
// Data per field 
router.get('/api/stock/type', (req, res) => {
  connection.query('SELECT type FROM stock', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving types from stock')
    } else {
      res.json(results);
    }
  });
});

router.get('/api/stock/packaged', (req, res) => {
  connection.query('SELECT packaged FROM stock', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving packaged from stock')
    } else {
      res.json(results);
    }
  });
});

router.get('/api/stock/amount', (req, res) => {
  connection.query('SELECT amount FROM stock', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving amount from stock')
    } else {
      res.json(results);
    }
  });
});

router.get('/api/stock/expiration', (req, res) => {
  connection.query('SELECT expiration FROM stock', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving expiration from stock')
    } else {
      res.json(results);
    }
  });
});






