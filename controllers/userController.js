const { response } = require('express');
const db = require('../database/db');
//var popupS = require('popups');

//index
const user_index = (req, res) => {
    let sql1 = 'SELECT * FROM books ORDER BY  bookDate limit 3';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('user/index', { result: result1 });
        }
        else {
            console.log('No new arrival books to display!!');

        }
    });
    // res.render('user/index', { title: 'EBOOKS STORE' });
}


//signup post
const user_signup_post = (req, res) => {
    // console.log(req.body);
    let something = {
        fullName: req.body.fullName,
        gender: req.body.gender,
        address: req.body.address,
        emailId: req.body.emailId,
        password: req.body.password,
        rePassword: req.body.rePassword
    }
    let sql = 'INSERT INTO users SET?';
    let query = db.query(sql, something, (err, result) => {
        if (err) throw err;
    });
    res.redirect('/users');
}
//index
// const user_signin = (req,res)=>{
//     res.render('user/signin',{title:'EBOOKS STORE'});
//     }

//signin get
const user_signin_get = (req, res) => {
    res.render('user/signin');
}

//signin post
const user_signin_post = (req, res) => {
    console.log(req.body);

    emailId = req.body.emailId;
    password = req.body.password;

    let sql = `SELECT * FROM users WHERE emailId="${req.body.emailId}" AND password="${req.body.password}"`;
    let query = db.query(sql, (err, result) => {

        if (err) throw err;
        // console.log(result);

        if (result[0] != null) {
            // session data
            sess = req.session;
            sess.loggedin = true;
            sess.fullName = result[0].fullName;
            sess.emailId = result[0].emailId;
            sess.userId = result[0].userId;
            // console.log('sess.fullName: ', req.session.fullName);
            // console.log('sess.emailId: ', req.session.emailId);
            sess.save();
            // res.render('user/browser', { userFullName: req.session.fullName });

            // also show computer books
            // let sql1 = 'SELECT * FROM books WHERE category="computer" limit 6';
            // let query1 = db.query(sql1, (err, result1) => {
            //     if (err) throw err;
            //     if (result1[0] != null) {
                    // console.log('adsfasdf'+req.session.fullName);

                    let sql2 = `SELECT SUM(bookSelectedQuantity) AS TotalQuantity FROM mycarts WHERE userId=${req.session.userId} `;
                    let query1 = db.query(sql2, (err, result2) => {
                        if (err) throw err;
                        if (result2[0].TotalQuantity != null) {
                            console.log(result2[0]);
                            // res.render('user/browser', { result: result1, userFullName: req.session.fullName, bookSelectedQuantity: result2[0].TotalQuantity });
                            res.render('user/home', { userFullName: req.session.fullName, bookSelectedQuantity: result2[0].TotalQuantity });
                            
                        }
                        else {
                            
                         // res.render('user/browser', { result: result1, userFullName: req.session.fullName, bookSelectedQuantity: "0" });
                          res.render('user/home',{ userFullName: req.session.fullName, bookSelectedQuantity: "0" });
                        }
                    });

                // }
                // else {
                //     console.log('No computer books to display!!');
                // }
            // });

        }
        else {
            // popupS.alert({
            //     content: 'Your email or password is incorrect!!!'
            // });
           // windows.alert("Your email or password in incorrect!!");
            // response.write("<script language='javascript'>alert('Your email or password in incorrect!!');</script>");
            // console.log('Your email or password in incorrect!!');
            //console.error("Your email or password in incorrect!!");
            //     <script type="text/javascript">
            //     var error = <%= error %>;          
            //     if(error!=null) 
            //    {  
            //    showAlert(error.message);
            //     }
            //   showAlert = function(err) {
            //   alert('error: ' + err);
            //   }
            //  </script>
            //alert('Your email or password in incorrect!!');
            //now
            // <script type="text/javascript">
            //     function validateSignUp(){
            //         alert("Your email or password is incorrect!!")
            //     }
            // </script>
            //  console.log('Your email or password in incorrect!!');
            //  res.send('Your email or password in incorrect!!');
            // res.render('signin', { message: 'Your email or password in incorrect!!' });
            res.render('user/signin1');
        }
    });
}

//aboutus
const user_aboutus = (req, res) => {
    res.render('user/aboutus', { title: 'ABOUT US' });
}

//aboutdevelopers
const user_aboutdevelopers = (req, res) => {
    res.render('user/aboutdevelopers', { title: 'ABOUT DEVELOPERS' });
}

//feedback
const user_feedback = (req, res) => {
    res.render('user/feedback', { title: 'FEEDBACK' });
}




//home
const user_home = (req, res) => {
    res.render('user/home', {userFullName: req.session.fullName});
}

//user_buy
const user_buy = (req, res) => {
    res.render('user/signin', {userFullName: req.session.fullName});
}

//add to cart to order in index page
const user_addtocart = (req, res) => {
    res.render('user/addtocart', {userFullName: req.session.fullName});
}

//signout
const user_signout = (req, res) => {

    res.redirect('/users');
    
}


//user browser viewall computer
const user_browser_viewall_computer = (req, res) => {
    let sql1 = 'SELECT * FROM books WHERE category="computer" limit 6';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('user/browserviewallcomputer', { result: result1, userFullName: req.session.fullName });
        }
        else {
            console.log('No computer books to display!!');

        }
    });
}


//user browser viewall civil
const user_browser_viewall_civil = (req, res) => {
    let sql1 = 'SELECT * FROM books WHERE category="civil" limit 6';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('user/browserviewallcivil', { result: result1, userFullName: req.session.fullName });
        }
        else {
            console.log('No civil books to display!!');

        }
    });
}

//user browser viewall mechanical
const user_browser_viewall_mechanical = (req, res) => {
    let sql1 = 'SELECT * FROM books WHERE category="mechanical" limit 6';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('user/browserviewallmechanical', { result: result1, userFullName: req.session.fullName});
        }
        else {
            console.log('No mechanical books to display!!');

        }
    });
}

//user browser viewall electronics
const user_browser_viewall_electronics = (req, res) => {
    let sql1 = 'SELECT * FROM books WHERE category="electronics" limit 6';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('user/browserviewallelectronics', { result: result1,  userFullName: req.session.fullName });
        }
        else {
            console.log('No electronics books to display!!');

        }
    });
}

//user browser viewall architecture
const user_browser_viewall_architecture = (req, res) => {
    let sql1 = 'SELECT * FROM books WHERE category="architecture" limit 6';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('user/browserviewallarchitecture', { result: result1,  userFullName: req.session.fullName });
        }
        else {
            console.log('No architecture books to display!!');

        }
    });
}

//user browser bookid
const user_browser_bookid = (req, res) => {
    const id = req.params.bookid;
    let sql1 = `SELECT * FROM books WHERE bookId="${id}" limit 1`;
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('user/browserbookid', { result: result1,  userFullName: req.session.fullName  });
        }
        else {
            console.log('No BookId  to display!!');

        }
    });
    //res.render('user/browserbookid', { title: 'USER BROWSER BOOKID' });
}

//user browser bookid addtocart get
const user_browser_bookid_addtocart_get = (req, res) => {
    // console.log(req.body);
    const id = req.params.bookid;
    const bookFile = req.params.bookFile;
   // let sql1 = `SELECT bookImage, bookFile, cost, bookDate, bookTitle, category FROM books WHERE bookId="${id}" limit 1`;
    let sql1=`SELECT bookImage, bookFile, cost, bookAuthor, bookDate, bookTitle, category FROM books WHERE bookId="${id}" limit 1`;
    //let sql1 = `SELECT bookDate, bookTitle,category, cost FROM books WHERE bookId="${id}" limit 1`;
    //let sql1 = `SELECT bookImage, cost FROM books WHERE bookId="${id}" limit 1`;
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            let something = {
                bookId: id,
                bookImage: result1[0].bookImage,
                bookFile: result1[0].bookFile,
                cost: result1[0].cost,
                bookSelectedQuantity: 1,
                userId: req.session.userId,
                bookAuthor: result1[0].bookAuthor,
                bookDate: result1[0].bookDate,
                bookTitle: result1[0].bookTitle,
                category: result1[0].category
            }
            let sql = 'INSERT INTO mycarts SET?';
            let query = db.query(sql, something, (err, result) => {
                if (err) throw err;
            });


            res.redirect(`/users/browser/${id}`);
            
        }
        else {
            console.log('No BookId  to display!!');

        }
    });

}


//user mycart
const user_mycart = (req, res) => {
   // let sql1 = `SELECT bookId, bookSelectedQuantity, bookImage, userId cost FROM mycarts WHERE userId=${req.session.userId}`;
   let sql1 = `SELECT bookId, bookDate, bookTitle, category, bookSelectedQuantity, bookImage, userId cost FROM mycarts WHERE userId=${req.session.userId}`;
   let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            //  let sql2 = `SELECT SUM(bookSelectedQuantity) FROM mycarts`;
            //  let query1 = db.query(sql1, (err, result1) => {
            //      if (err) throw err;
            //  });
            res.render('user/mycart', { result: result1 ,  userFullName: req.session.fullName });
        }
        else {
            console.log('Nothing to display in my cart');

        }
    });
}

//user clicks on order of mycart page and order is inserted
const user_mycart_orderpost = (req, res) => {
    let something = {
        bookDate: req.body.bookDate,
        userId: req.body.userId,
        bookId: req.body.bookId,
        cost: req.body.cost
    }
    let sql = 'INSERT INTO orders SET?';
    let query = db.query(sql, something, (err, result) => {
        if (err) throw err;
    });
    res.redirect('/users/mycart');
}


//user continueshopping
const user_continueshopping = (req, res) => {
    res.redirect('/users/browser/viewallcomputer');
}

//user deleteacart
const user_deleteacart = (req, res) => {
    const id = req.params.bookid;
    console.log('id: ' + id);
    let sql1 = `DELETE FROM mycarts WHERE bookId="${id}" `;
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        res.redirect('/users/mycart');
    });

}

//user order
const user_order = (req, res) => {
    let sql1 = `SELECT bookId, cost, bookDate, bookSelectedQuantity FROM mycarts WHERE userId=${req.session.userId}`;
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            //console.log('userId: ' + req.session.userId);

            let something = {
                bookDate: result1[0].bookDate,
                bookId: result1[0].bookId,
                cost: result1[0].cost,
                userId: req.session.userId
            }
            let sql = 'INSERT INTO orders SET?';
            let query = db.query(sql, something, (err, result) => {
                if (err) throw err;
            });

            // sum of bookSelectedQuantity//
            totalCost = 0;
            result1.forEach(cart => {
                //console.log('bookId: ' + cart.bookId);
                totalCost += cart.cost;
            });
            res.render('user/order', { result: result1, total: totalCost, userFullName: req.session.fullName });
        }

        else {
            console.log('No Books are ordered');
        }
    });
}

//user payment and download
const user_payment = (req, res) => {
    let sql1 = `SELECT bookId, cost FROM mycarts `;
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            res.render('user/payment', { result: result1, userFullName: req.session.fullName });
        }
        else {
            console.log('Nothing to display in the payment part');
        }
    });
}

//user downloads
const user_download = (req, res) => {
    const id = req.params.bookid;
    let sql1 = `SELECT bookId, cost ,bookFile FROM mycarts WHERE bookId="${id}" `;

    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log('result1[0]: ' + result1[0].bookFile);
            res.download(`./public/images/books1/${result1[0].bookFile}`, { result: result1,  userFullName: req.session.fullName  });
           
            //Remove from cart
            let sql1 = `DELETE FROM mycarts WHERE bookId="${id}" `;
            let query1 = db.query(sql1, (err, result1) => {
                if (err) throw err;               
            });
            //Upto here

        }
        else {
            console.log('Nothing to display in the download part');
        }
    });
}


//user gives feedback
const user_feedback_post = (req1, res1) => {
    console.log('req1.session.fullName: ' + req1.session.fullName);
    let something = {
        fullName: req1.session.fullName,
        bookTitle: req1.body.bookTitle,
        feedback: req1.body.feedback
    }
    let sql = 'INSERT INTO viewfeedbacks SET?';
    let query = db.query(sql, something, (err, result) => {
        if (err) throw err;
    });
    res1.redirect('/users/feedback');
}




module.exports = {
    user_index,
    user_signup_post,
    user_signin_get,
    user_signin_post,
    user_aboutus,
    user_aboutdevelopers,
    user_feedback,
    user_home,
    user_buy,
    user_addtocart,
    user_browser_viewall_computer,
    user_browser_viewall_civil,
    user_browser_viewall_mechanical,
    user_browser_viewall_electronics,
    user_browser_viewall_architecture,
    user_browser_bookid,
    user_browser_bookid_addtocart_get,
    user_mycart,
    user_mycart_orderpost,
    user_continueshopping,
    user_deleteacart,
    user_order,
    user_payment,
    user_download,
    user_feedback_post,
    //user_browser_bookid_addtocart_post,
    user_signout,
    
}