require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");

const app = express();
const CACHE_TTL = 1000 * 60 * 60 * 24 * 2;

mongoose.connect(process.env.MONGO_URI);

const cache = { recipes: { data: null, timestamp: null } };

const sampleSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredient: [String],
  quantity: Number,
  type: String,
  instructions: [String],
  slug: String // A URL-friendly version of the title
});
const Sample = mongoose.model("Sample", sampleSchema, "sample1");

const User = mongoose.model("User", new mongoose.Schema({ googleId: String }));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) user = await User.create({ googleId: profile.id });
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use(express.static("public"));
app.use(session({ secret: "your secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  if (!req.user) return res.redirect("/");
  res.send("Welcome, you are logged in!");
});

// API: Get all recipes
app.get("/api/recipes", async (req, res) => {
  const now = Date.now();
  if (cache.recipes.data && now - cache.recipes.timestamp < CACHE_TTL) {
    return res.json(cache.recipes.data);
  }

  try {
    const data = await Sample.find({});
    cache.recipes.data = data;
    cache.recipes.timestamp = now;
    res.json(data);
  } catch (err) {
    res.status(500).send("Failed to fetch recipes");
  }
});

// API: Get single recipe by slug
app.get("/api/recipe/:slug", async (req, res) => {
  try {
    const recipe = await Sample.findOne({ slug: req.params.slug });
    if (!recipe) return res.status(404).send("Recipe not found");
    res.json(recipe);
  } catch (err) {
    res.status(500).send("Failed to fetch recipe");
  }
});

// Serve recipe.html
app.get("/recipe", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "recipe.html"));
});

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
