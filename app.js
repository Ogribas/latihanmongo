// Module
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const {tampilSemua,Parfum} = require('./utils/db');


// Port Number
const port = 3000;

// Middleware
// app.use(expressLayouts);
app.use(express.urlencoded({extended:true}))

// View Engine
app.set(`view engine`,'ejs');

app.get('/',async (req,res)=>{
    let products = await tampilSemua();
    res.render('home.ejs',{products});
})

app.get('/contact/:id',async (req,res)=>{
    let products = await Parfum.findOne({_id:req.params.id}).then((d)=>{
        return d
    }).catch((er)=>{
        return '';
    });

    res.render('details.ejs',{products})
})

app.get('/details/update/:id',async (req,res)=>{
    let products = await Parfum.findOne({_id:req.params.id}).then((d)=>{
        return d;
    }).catch((e)=>{
        return '';
    })

   res.render('update.ejs',{products});
})

// Update Post
app.post('/details/update',async (req,res)=>{
    await Parfum.findOneAndUpdate({_id: req.body.id},{$set:{name: req.body.name,harga: req.body.harga}}).then((d)=>{
        res.redirect('/');
    }).catch((e)=>{
        res.redirect(`/details/update/${req.params.id}`);
    });
    
})

app.post('/details/delete/:id',async(req,res)=>{
    await Parfum.findByIdAndDelete(req.params.id).then((d)=>{
        res.redirect('/');
    }).catch((e)=>{
        res.redirect(`/contact/${req.params.id}`);
    });
})

app.post('/home',async (req,res)=>{
   let parfumBaru = new Parfum(req.body);
   parfumBaru.save();
   res.redirect('/');
})

app.use('/',(req,res)=>{
    res.send('kontol')
})

app.listen(3000,(e,r)=>{
    if(e)console.log(`error woi`);

    console.log(`Port running on ${port}`);
})
