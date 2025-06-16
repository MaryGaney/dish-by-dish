require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const CACHE_TTL = 1000 * 60 * 60 * 24 * 2; // 2 days
const cache = {
  recipes: {
    data: null,
    timestamp: null
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define User schema for Google login
const User = mongoose.model("User", new mongoose.Schema({ googleId: String }));

// Define Sample schema for recipe data
const sampleSchema = new mongoose.Schema({
  type: String,
  ingredient: [String],
  quantity: Number
});
const Sample = mongoose.model("Sample", sampleSchema, "sample1"); // using collection sample1

// Passport Google OAuth config
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

// Middleware
app.use(express.static("public")); // serve static HTML, JS, CSS
app.use(session({ secret: "your secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/dashboard")
);

app.get("/dashboard", (req, res) => {
  if (!req.user) return res.redirect("/");
  res.send("Welcome, you are logged in!");
});

// API route to get recipes with caching
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
    console.error("Error fetching recipes:", err);
    res.status(500).send("Failed to fetch recipes");
  }
});

// Prevent favicon 404 error
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Start the server
app.listen(3000, () => console.log("Server started on http://localhost:3000"));
