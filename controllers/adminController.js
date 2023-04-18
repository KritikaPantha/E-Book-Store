const db = require('../database/db');
const formidable = require('formidable');
const fs = require('fs');
const session = require('express-session');


//admin index
const admin_index = (req, res) => {
    res.render('admin/index', { title: 'EBOOKS STORE' });
}

//admin login
const admin_login = (req, res) => {
    res.render('admin/adminlogin', { title: 'ADMIN LOGIN' });
}

//admin login post
const admin_login_post = (req, res) => {
    //console.log(req.body);
    
    let sql = `SELECT * FROM admins WHERE adminEmailId="${req.body.adminEmailId}" AND adminPassword="${req.body.adminPassword}"`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        if (result[0] != null) {
            sess = req.session;
            sess.loggedin = true;
            sess.adminEmailId = result[0].adminEmailId;
            sess.adminPassword = result[0].adminPassword;
            sess.adminName = result[0].adminName;
            sess.save();
            res.render('admin/menu', { adminFullName: req.session.adminName });
        }
        else {
            res.render('admin/adminlogin1');
            // console.log('Your email or password in incorrect!!');
            // res.send('Your email or password in incorrect!!');
        }
    });
}


//menu
const admin_menu = (req, res) => {
        res.render('admin/menu', { title: 'ADMIN MENU',  adminFullName: req.session.adminName });
}

//addabook get
const admin_addabook_get = (req, res) => {
    res.render('admin/addabook', { title: 'ADD A BOOK', adminFullName: req.session.adminName  });
}

//addabook post
const admin_addabook_post = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) throw err;

        let oldPath = files.bookImage.filepath;
        let newPath = './public/images/' + files.bookImage.originalFilename;
        //let newPath = './uploads/' + files.bookImage.originalFilename;

        let oldPath1 = files.bookFile.filepath;
        let newPath1 = './public/images/books1/' + files.bookFile.originalFilename;
        //let newPath1 = './uploads/books/' + files.bookFile.originalFilename;

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;

            fs.rename(oldPath1, newPath1, function (err) {
                if (err) throw err;

                let something = {
                    bookId: fields.bookId,
                    bookTitle: fields.bookTitle,
                    cost: fields.cost,
                    category: fields.category,
                    bookQuantity: fields.bookQuantity,
                    bookAuthor: fields.bookAuthor,
                    bookDate: fields.bookDate,
                    bookImage: files.bookImage.originalFilename,
                    bookFile: files.bookFile.originalFilename
                }
                // console.log(req.body);
                let sql = 'INSERT INTO books SET?';
                let query = db.query(sql, something, (err, result) => {
                    if (err) throw err;
                });


            })

        })

    })

    res.redirect('/admins/browser/viewallbooks');

}

//admin browser viewallbooks
const admin_browser_viewallbooks = (req, res) => {
    let sql1 = 'SELECT * FROM books ';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('admin/viewallbooks', { result: result1, adminFullName: req.session.adminName  });
        }
        else {
            console.log('No  books to display!!');

        }
    });
}

//admin remove a book
const admin_removeabook_get = (req, res) => {
    let sql1 = 'SELECT * FROM books ';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('admin/removeabook', { result: result1, adminFullName: req.session.adminName  });
        }
        else {
            console.log('No  books to display!!');
        }
    });
}

//admin delete
const admin_delete = (req, res) => {
    const id = req.params.bookid;
    console.log('id: ' + id);
    let sql1 = `DELETE FROM books WHERE bookId="${id}" `;
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
       // res.render('admin/removeabook', {adminFullName: req.session.adminName});
          res.redirect('/admins/removeabook');
    });
}

//admin checkstock
const admin_checkstock = (req, res) => {
    //res.render('admin/checkstock');
    let sql1 = `select books.bookTitle, books.bookQuantity, 
        sum(mycarts.bookSelectedQuantity) as totalBookSelectedQty, 
        books.bookQuantity - sum(mycarts.bookSelectedQuantity) as bookAvailable
        from books
        inner join mycarts on books.bookId = mycarts.bookId
        group by mycarts.bookId`;

    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {

            res.render('admin/checkstock', { result: result1, adminFullName: req.session.adminName  });
        }
        else {
            console.log('Nothing to display in checking stock option');

        }
    });
}

//admin vieworder
const admin_vieworder = (req, res) => {
    let sql1 = 'SELECT users.fullName, books.bookTitle FROM ((orders INNER JOIN users ON orders.userId = users.userId) INNER JOIN books ON orders.bookId = books.bookId)';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
            // console.log(result1[0]);
            res.render('admin/vieworder', { result: result1, adminFullName: req.session.adminName });
        }

        else {
            console.log('No books to display in order list!!');
        }
    });
}

//admin viewfeedback
const admin_viewfeedback = (req, res) => {
   // let sql1 = `SELECT * FROM viewfeedbacks `;
   let sql1 ='SELECT fullName, bookTitle, feedback FROM viewfeedbacks';
    let query1 = db.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1[0] != null) {
           res.render('admin/viewfeedback', { result: result1, userFullName: req.session.fullName  });
        }
        else {
            console.log('Nothing to display in my cart');

        }
    });
}




//home
const admin_home = (req, res) => {
    res.redirect('/admins');
}

//signout
const admin_signout = (req, res) => {
    try {

        // session data
        req.session.destroy(() => {
            sess = req.session;
            sess.loggedin = false;
            console.log("Admin logged out.")
            res.redirect('/admins');
        });

    } catch (err) {
        console.error(err.message)
    }

}





module.exports = {
    admin_index,
    admin_login,
    admin_login_post,
    admin_menu,
    admin_addabook_get,
    admin_addabook_post,
    admin_removeabook_get,
    admin_delete,
    admin_checkstock,
    admin_vieworder,
    admin_viewfeedback,
    admin_home,
    admin_browser_viewallbooks,
    admin_signout
}
