const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const Users = require("../models/users");
const multer = require("multer");
const isAuth = require("./authMiddleware").isAuth;
// Storage
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "my-images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

//Tells multer where to store files
const upload = multer({ storage: Storage });

/**
 * -------------- POST ROUTES ----------------
 */

//User enters login information
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/form",
  })
);
//Hash n Salt process
router.post("/register", (req, res) => {
  try {
    //Check to see if req.body.username already exists in database
    Users.findOne({ username: req.body.username }, function (err, result) {
      if (err) throw err;
      if (result) {
        let a = `User already exists. Please pick a different name.`
        res.render('_register', {
          a
        })
      } else {
        const saltHash = genPassword(req.body.password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new Users({
          username: req.body.username,
          hash: hash,
          salt: salt,
        });

        newUser.save().then((user) => {
          console.log(user);
        });
        res.redirect("/login");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//Post on form
router.post("/form", upload.single("pic"), async (req, res) => {
  let imgPath = req.file.path;
  //Capitalize first letter of any string
  let category = req.body.category
  const capitalCategory = category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

  await req.user.favorites.push({
    category: capitalCategory,
    name: req.body.name,
    description: req.body.description,
    image: imgPath,
  });
  await req.user.save();
  res.render("_form");
});

/**
 * -------------- GET ROUTES ----------------
 */

//Login Pgae
router.get("/login", (req, res) => {
  res.render("_login");
});
//Register Page
router.get("/register", (req, res) => {
  let a = ''
  res.render("_register", {
    a
  });
});

//User Form Page
router.get("/form", isAuth, (req, res) => {
  const userInfo = req.user;

  res.render("_form");
});
//Gallery Page: all categories
router.get("/gallery", async (req, res) => {
  try {
    let userObject = await req.user.favorites;
    let categoriesArr = [];
    for (let i = 0; i < userObject.length; i++) {
      categoriesArr.push(userObject[i].category);
    }
    let uniqueChars = [...new Set(categoriesArr)];
    res.render("_gallery", {
      data: userObject,
      categories: uniqueChars,
    });
  } catch (error) {
    console.log(error);
  }
});
//Logout Page
router.get("/logout", (req, res) => {
  console.log("dsgfrgerg");
  req.logout();
  res.redirect("/register");
});

router.get("/login-failure", (req, res) => {
  res.render("404");
});

//Gallery Page: Specific category
router.get("/gallery/:category", async (req, res) => {
  try {
    let userObject = await req.user.favorites;
    let categoriesArr = [];
    for (let i = 0; i < userObject.length; i++) {
      categoriesArr.push(userObject[i].category);
    }
    let uniqueChars = [...new Set(categoriesArr)];
    let newArr = userObject.filter(
      (item) => item.category === req.params.category
    );
    res.render("_gallery", { data: newArr, categories: uniqueChars });
  } catch (error) {
    console.log(error);
  }
});

/**
 * -------------- DELETE ROUTE ----------------
 */

//Logout Page
router.post("/delete/:objectText", async (req, res) => {
  try {
    let userObject = await req.user.favorites;

    for (let i = 0; i < userObject.length; i++) {
      if (userObject[i].name === req.params.objectText) {
        console.log(userObject[i]);
        userObject.splice(i, 1);
      }
    }
    await req.user.save();
    res.redirect("/gallery");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
