const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const clone = require('clone');
const { formatWith } = require('./utils');

const data = require('./data')
data.init();



const PORT = process.env.MOCK_PORT || 8090
const DELAY = process.env.MOCK_DELAY || 500

const app = express();
app.disable('x-powered-by');


// delay all requests
app.use((req, res, next) => { 
//   let originalUrl = req.originalUrl.split('?')[0]
//   if (originalUrl === '/connections' || originalUrl === '/configs') {
// console.log('long delay');
//     setTimeout(next, 30000);
//   } else {
//     setTimeout(next, DELAY);
//   }

   setTimeout(next, DELAY);
})


// add CORS headers
app.use(cors({ origin: true, credentials: true }));

// parse application/json body
app.use(bodyParser.json())

// sessions
app.use(
  session({
    secret: 'secret-key-23566895689723423465',
    store: new FileStore({}),
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 1000, // expires in 60 min
    }, 
    saveUninitialized: true,
  })
)

var req_ip = '';
var req_usr = '';
function l() {
  console.log.apply(this, [formatWith("yyyy-MM-dd'T'HH:mm:ssXXX"), req_usr?'[usr:'+req_usr+']':'', ...arguments]);
}
app.use(function(req, res, next){
  req_usr = req && req.session ? req.session.userId : '';
  next();
});

// log all requests to console and check session
app.use((req, res, next) => { 
  l('<<', req.method, req.protocol + '://' + req.get('host') + req.originalUrl);
  if (req.body && Object.keys(req.body).length > 0) {
    let b = {...req.body}
    if (b.pwd) b.pwd='***'
    if (b.password) b.password='***'
    if (b.confirm_password) b.confirm_password='***'
    if (b.password_confirm) b.password_confirm='***'
    l('body', b);
  }
//  l('headers', req.headers)


  if (req.session && req.session.userId || ['/auth/signin/', '/auth/signup/'].indexOf(req.url) !== -1) {
    next();
  } else {
    next({statusCode:401, detail: "Учетные данные не были предоставлены."});
  }
})



////////////////////////////////////////////////////////////////////////
//
// Unauthorized methods
//
////////////////////////////////////////////////////////////////////////


app.post('/auth/signin', function (req, res, next) {
  var {email, password} = req.body || {};

  let user = data.getUsers().filter(u => u.email === email && u.pwd === password)[0]

  req.session.regenerate(function (err) {
    if (err) next(err)
    if (user) {
      console.log("LOGIN OK");
      req.session.userId = user.id;
      req.session.save(function (err) {
        if (err) return next(err)
        let r = {success:true}
        res.status(200).send(r);
        console.log('>>', 200, JSON.stringify(r))
      })
    } else {
      next({statusCode:401, non_field_errors:["Неверные учетные данные."]});
    }
  })  
});


app.post('/auth/signup', function (req, res, next) {
  var {email, password} = req.body || {};

  let user = data.getUsers().filter(u => u.email === email && u.pwd === password)[0]

  req.session.regenerate(function (err) {
    if (err) next(err)
    if (user) {
      console.log("LOGIN OK");
      req.session.userId = user.id;
      req.session.save(function (err) {
        if (err) return next(err)
        let r = {success:true}
        res.status(200).send(r);
        console.log('>>', 200, JSON.stringify(r))
      })
    } else {
      next({statusCode:401, non_field_errors:["Неверные учетные данные."]});
    }
  })  
});



////////////////////////////////////////////////////////////////////////
//
// Authorized-only methods
//
////////////////////////////////////////////////////////////////////////


app.post('/auth/logout', function (req, res, next) {
  req.session.destroy();

  let r = {success:true}
  res.status(200).send(r);
  console.log('>>', 200, JSON.stringify(r))
});



app.post('/auth/signin/resend-code', function (req, res, next) {
  let r = {success:true}
  res.status(200).send(r);
  console.log('>>', 200, JSON.stringify(r))
});



app.post('/auth/signin/confirm', function (req, res, next) {
  var {code} = req.body || {};

  if (code==='123456') {
    let r = {success:true}
    res.send(r);
    console.log('>>', 200, JSON.stringify(r))
  } else {
    next({statusCode:401, detail:"Неверный код."})
  }
});


app.post('/auth/signup/confirm', function (req, res, next) {
  var {code} = req.body || {};

  if (code==='123456') {
    let r = {success:true}
    res.send(r);
    console.log('>>', 200, JSON.stringify(r))
  } else {
    next({statusCode:401, detail:"Неверный код."})
  }
});




app.get('/auth/info', function (req, res, next) {
  const {email, language, currency} = data.getUsers().filter(u=>u.id===req.session.userId)[0] || {}
  const r = {email, language, currency}
  res.send(r);
  console.log('>>', 200, JSON.stringify(r))
});



app.patch('/auth/currency', function (req, res, next) {
  const {currency} = req.body || {};
  const user = data.getUsers_changeable().filter(u=>u.id===req.session.userId)[0]
  user.currency = currency
  const r = {success:true}
  res.send(r);
  console.log('>>', 200, JSON.stringify(r))
});



app.get('/auth/settings/sessions', function (req, res, next) {
  const r = [
    {
        "session_key": "123",
        "device": "Windows 10 / Chrome",
        "ip_address": "192.168.1.1",
        "last_activity": "2025-12-31T23:59:00.000+03:00",
        "created_at": "2025-12-31T00:00:00.000+03:00"
    },
    {
        "session_key": "7tquu8tj51ilrncnb5qeatw8nia9kfef",
        "is_current":true,
        "device": "Windows 10 / Chrome",
        "ip_address": "95.24.97.255",
        "last_activity": "2026-02-17T11:08:33.328118+03:00",
        "created_at": "2026-02-17T11:08:32.947884+03:00"
    }
  ]
  res.send(r);
  console.log('>>', 200, JSON.stringify(r))
})



app.delete('/auth/settings/sessions/:id', function (req, res, next) {
  //const id = req.params.id
  res.status(204).send();
  console.log('>>', 204)
})



app.post('/auth/reset-password/', function (req, res, next) {
  //var {password} = req.body || {};
  res.status(200).send();
  console.log('>>', 200)
})










app.get('/wallets', function (req, res, next) {
  const user = data.getUsers().filter(u=>u.id===req.session.userId)[0]
  const r = clone(user?.wallets || [])

  if (user?.currency === 'RUB') {
    r.forEach(coin => {
      coin.rate = "" + (+coin.rate)*76.32
      coin.available_balance.converted = "" + (+coin.available_balance.converted)*76.32
      coin.frozen_balance.converted = "" + (+coin.frozen_balance.converted)*76.32
    })
  }
  if (user?.currency === 'EUR') {
    r.forEach(coin => {
      coin.rate = "" + (+coin.rate)*0.8214
      coin.available_balance.converted = "" + (+coin.available_balance.converted)*0.8214
      coin.frozen_balance.converted = "" + (+coin.frozen_balance.converted)*0.8214
    })
  }

  res.send(r);
  console.log('>>', 200, JSON.stringify(r))
});




app.post('/wallets/withdraw/confirm', function (req, res, next) {
  var { code } = req.body || {};
  if (code === '123456') {
    const r = {success:true}
    res.send(r);
    console.log('>>', 200, JSON.stringify(r))
  } else {
    next({statusCode:401, address:"Wrong code"})
  }
});


app.post('/wallets/withdraw/', function (req, res, next) {
  var { address, amount, coin } = req.body || {};
  if ((address||"").length > 5) {
    const r = {success:true}
    res.send(r);
    console.log('>>', 200, JSON.stringify(r))
  } else {
    next({statusCode:400, address:"Wrong address"})
  }
});



app.post('/wallets/deposit/', function (req, res, next) {
  var { coin } = req.body || {};
  const r = {
    "wallet_id": 81,
    "coin": "BTC",
    "deposit_address": "bc1qa930cfp2gr5uqz3l00n7g6mtz48742cgk985mu",
    "min_deposit": "0.00001"
  }
  res.send(r);
  console.log('>>', 200, JSON.stringify(r))
})


app.get('/wallet/api/exchange/pairs/', function (req, res, next) {
  const { from_coin, to_coin } = req.query || {};
  let r = []
  if (from_coin==='BTC' || to_coin==='RUB') {
    r = [{
      id: "81",
      from_coin: "BTC",
      to_coin: "RUB",
      avaliable: false,
    }, {
      id: "80",
      from_coin: "BTC",
      to_coin: "RUB",
      avaliable: true,
    }, {
      id: "79",
      from_coin: "BTC",
      to_coin: "LTC",
      avaliable: true,
    }]
  }
  if (from_coin==='RUB' || to_coin==='BTC') {
    r = [{
      id: "101",
      from_coin: "RUB",
      to_coin: "BTC",
      avaliable: true,
    }]
  }
  res.send(r);
  console.log('>>', 200, JSON.stringify(r))
})


app.get('/wallet/api/exchange/max-amount/', function (req, res, next) {
  const { exchange_pair } = req.query || {};
  const r = {
    "amount": exchange_pair==='80' || exchange_pair==='79' ? 10 : 1000,
  }
  res.send(r);
  console.log('>>', 200, JSON.stringify(r))
})



app.get('/wallet/api/exchange/validate/', function (req, res, next) {
  const { exchange_pair, amount } = req.query || {};
  let r;
  if (exchange_pair==80) {
    const receive_amount = +amount * 5652923.18
    if (!isNaN(receive_amount)) {
      r = {
        exchange_pair: 80,
        amount: amount,
        receive_currency: "RUB",
        receive_amount: "" + receive_amount,
      }
    }
  } else if (exchange_pair==79) {
    const receive_amount = +amount * 1263.65
    if (!isNaN(receive_amount)) {
      r = {
        exchange_pair: 79,
        amount: amount,
        receive_currency: "LTC",
        receive_amount: "" + receive_amount,
      }
    }
  } else if (exchange_pair==101) {
    const receive_amount = +amount / 5652923.18
    if (!isNaN(receive_amount)) {
      r = {
        exchange_pair: 101,
        amount: amount,
        receive_currency: "BTC",
        receive_amount: "" + receive_amount,
      }
    }
  }
  if (r) {
    res.send(r);
    console.log('>>', 200, JSON.stringify(r))
  } else {
    next({statusCode:400})
  }
})



app.post('/wallet/api/exchange/', function (req, res, next) {
  const { exchange_pair, amount } = req.body || {};
  const amount_parsed = Number.parseFloat(amount);
   
  if (isNaN(amount_parsed)) {
    next({statusCode:400, details:'Cannot parse amount'})
  } else if (amount_parsed<= 0) {
    next({statusCode:400, details:'Amount should be greater then zero'})
  } else { 
    const r = {
      "id": crypto.randomUUID(),
      "coin": "BTC",
      "currency": "RUB",
      "amount": amount,
      "commission": "0.02",
      "full_amount": "" + (+amount) + 0.02,
      "status": "pending",
      "out_exchange": {
        "id": crypto.randomUUID(),
        "from_coin": "BTC",
        "to_currency": "RUB",
        "status": "pending",
        "created_at": Date.now()
      },
      "created_at": Date.now(),
    }
    res.send(r);
    console.log('>>', 200, JSON.stringify(r))
  }
})



app.get('/wallets/transactions/', function (req, res, next) {
  const { coin } = req.query || {};
  let r = {"count":0,"next":null,"previous":null,"results":[]}
  if (coin === 'TRX') {
    r = {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": "dc15de47-7d35-422e-9bdb-858bee677bf4",
            "tx_id": "ed1d651963f06f90480ffba979494f4333913ed502ee2256ae4f24c0f1fa93e9",
            "provider_id": "2f1bc7b7-eee7-4f7b-9472-d941c0b84b36",
            "coin": "TRX",
            "category": "deposit",
            "address": "TCtD3NQGsdxvnZXKxUH2fPXYQnqQ3CxSnf",
            "amount": "1",
            "commission": "0",
            "internal": false,
            "status": "confirmed",
            "created_at": "2026-02-05T09:46:49.499440+03:00",
            "sent_at": "2026-02-05T09:46:49.497289+03:00",
            "confirmed_at": "2026-02-05T09:46:52.915623+03:00"
        }
    ]}
  }
  res.send(r);
  console.log('>>', 200, JSON.stringify(r))
})






// default 404 response 
app.use(function (req, res, next) {
  res.status(404).send("route not exists :(");
  console.log(">>", "404")
});

// default error handler 
app.use((err, req, res, next)=>{
  if (res.headersSent) {
    return next(err);
  }

  if (typeof err === 'object' && err.statusCode) {
    const statusCode = err.statusCode || 400;
    delete err.statusCode;
    res.status(statusCode).send(err)
    console.log(`<< ${statusCode} ${JSON.stringify(err, null, 4)}`);
  } else {
    console.log('ERR', err)
    res.status(500).send({
        detail: err.toString()
    });
    console.log("<<", "500")
  }
});

// uncaughtException error handler
process.on('uncaughtException', function (err) {
  console.log('**************************');
  console.log('* [process.on(uncaughtException)]: err:', err);
  console.log('**************************');
});


app.listen(+PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
  console.log(`  DELAY=${DELAY}`)
})
