const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", function(req,res) {

  const username = req.body.username;
  const password = req.body.password;


  if (username && password) {
      
      if (!isValid(username)) {
          
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  
  return res.status(404).json({message: "Unable to register user."});
  
});


public_users.get('/',function (req, res) {
  
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(res.send(JSON.stringify(books,null,11)));
    },6000)})

    console.log("Before calling promise");

    myPromise.then((successMessage) => {
      console.log("From Callback " + successMessage)
    })
    console.log("After calling promise");
});


public_users.get('/isbn/:isbn',function (req, res) {

  const isbn = req.params.isbn;
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(res.send(books[isbn]));
    },6000)})

    console.log("Before calling promise");

    myPromise.then((successMessage) => {
      console.log("From Callback " + successMessage)
    })
    console.log("After calling promise");

 });
  

public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let ele=1;
  Object.entries(books).forEach(([key, book]) => {
    if (book.author === author) {
      res.send(books[ele])
    }
    ele+=1;
  });

  res.status(300).json({message: "Author not found"});
});


public_users.get('/title/:title',function (req, res) {
 
  const title = req.params.title;
  let ele=1;
  Object.entries(books).forEach(([key, book]) => {
    if (book.title === title) {
      res.send(books[ele]);
    }
    ele+=1;
  });
  return res.status(300).json({message: "Book not found"});
});


public_users.get('/review/:isbn',function (req, res) {

  const isbn = req.params.isbn;
  const reviews = books[isbn].reviews;
  res.send(reviews);
});

module.exports.general = public_users;
