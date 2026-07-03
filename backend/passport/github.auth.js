import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/user.model.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          username: profile.username,
        });

        if (!user) {
          user = await User.create({
            username: profile.username,
            name: profile.displayName,
            profileUrl: profile.profileUrl,
            avatarUrl: profile.photos[0].value,
            likedBy: [],
            likedProfiles: [],
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);