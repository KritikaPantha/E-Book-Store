const express = require('express');
// const mysql = require('mysql');
const db = require('./database/db');
const morgan = require('morgan');
const app=express();
const userRoutes=require('./route/userRoutes');
const adminRoutes=require('./route/adminRoutes');
var session = require('express-session');



//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));

// Session Setup 
app.use(session({ 
  
  // It holds the secret key for session 
  secret: 'A_Secret_Key', 

  // Forces the session to be saved 
  // back to the session store 
  resave: true, 

  // Forces a session that is "uninitialized" 
  // to be saved to the store 
  saveUninitialized: true
})) 

// create connection
// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'ProjectII'
// });

//connect
db.connect((err)=>{
    if(err)
    {
      throw(err);
    }
    console.log('MYSql Connected..');
});

//create database
app.get('/createdb',(req,res)=>{
    let sql = 'CREATE DATABASE ProjectII';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Database Created...');
    });
});

//create users table
app.get('/createuserstable',(req,res)=>{
    let sql='CREATE TABLE users(userId INT AUTO_INCREMENT, fullName VARCHAR(255), gender VARCHAR(255), address VARCHAR(255), emailId VARCHAR(255) NOT NULL UNIQUE , password VARCHAR(255), rePassword VARCHAR(255),  PRIMARY KEY(userId))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Users table created');
    });
});

//create admins table
app.get('/createadminstable',(req,res)=>{
    let sql = 'CREATE TABLE admins(adminEmailId VARCHAR(255), adminPassword VARCHAR(255), adminName VARCHAR(255), PRIMARY KEY(adminEmailId))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Admins table created');
    });
});

//create books table
app.get('/createbookstable',(req,res)=>{
    let sql = 'CREATE TABLE books(bookId INT AUTO_INCREMENT, bookTitle VARCHAR(255), bookAuthor VARCHAR(255),cost VARCHAR(255),category VARCHAR(255), bookDate VARCHAR(255), bookImage VARCHAR(255), bookFile VARCHAR(255), bookQuantity VARCHAR(255),PRIMARY KEY(bookId))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Books table created');
    });
});

 //create mycarts table
 app.get('/createmycartstable',(req,res)=>{
    let sql = `CREATE TABLE mycarts(
        cartId INT AUTO_INCREMENT, 
        bookId INTEGER, 
        bookImage VARCHAR(255), 
        bookFile VARCHAR(255), 
        userId INTEGER, 
        bookSelectedQuantity INTEGER, 
        cost INTEGER, 
        PRIMARY KEY(cartId), 
        bookAuthor VARCHAR(255),
        bookDate VARCHAR(255), 
        bookTitle VARCHAR(255), 
        category VARCHAR(255), 
        FOREIGN KEY (bookId) REFERENCES books(bookId), 
        FOREIGN KEY (userId) REFERENCES users(userId)
    )`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('My Carts table created');
    });
 });

//create order table
app.get('/createorderstable',(req,res)=>{
    let sql = 'CREATE TABLE orders(orderId INT AUTO_INCREMENT, bookDate VARCHAR(255), userId INT, bookId INTEGER, cost VARCHAR(255), PRIMARY KEY(orderId), FOREIGN KEY (bookId) REFERENCES books(bookId), FOREIGN KEY (userId) REFERENCES users(userId))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Orders table created');
    });
 });

//create viewfeedback table
app.get('/createviewfeedbackstable',(req,res)=>{
    let sql = 'CREATE TABLE viewfeedbacks(feedbackId INT AUTO_INCREMENT, fullName VARCHAR(255), bookTitle VARCHAR(255), feedback VARCHAR(255), PRIMARY KEY(feedbackId))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('ViewFeedback table created');
    });
 });


//insert an admin
app.get('/addadmin1',(req,res)=>{
    let admin={adminEmailId:'kritika@gmail.com',adminPassword:'kritika',adminName:'KRITIKA'};
    let sql = 'INSERT INTO admins SET?';
    let query = db.query(sql,admin,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Admin Kritika inserted in Admin Table');
    });
});



//register view engine
app.set('view engine','ejs');

//routes
app.get('/',(req,res)=>{
    res.redirect('/users');
});

app.get('/admin-show',(req,res)=>{
    res.redirect('/admins');
});



//user route
app.use('/users',userRoutes);

//admin route
app.use('/admins',adminRoutes);


//listening
app.listen('3000',()=>{
    console.log('Server started on port 3000');
});


