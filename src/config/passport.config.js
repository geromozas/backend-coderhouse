import passport from "passport";
import github from "passport-github2";
import { UserModel } from "../dao/models/user.model.js";
import { createHash } from "../utils/bcrypt.js";
import { config } from "./config.js";

export const initPassport = () => {
  passport.use(
    "github",
    new github.Strategy(
      {
        clientID: config.dbClientId,
        clientSecret: config.dbClientSecret,
        callbackURL: "http://localhost:8080/api/sessions/callbackGithub",
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          // console.log(profile);
          const password = profile.id;
          const hashedPadd = createHash(password);
          let email = profile.email;
          if (!email) {
            email = profile.id + "@github.com";
          }
          let { name } = profile._json;
          let usuario = await UserModel.findOne({ email });
          if (!usuario) {
            usuario = await UserModel.create({
              first_name: name,
              last_name: name,
              email: email,
              github: profile,
              password: hashedPadd,
              role: "user",
              cart: null,
            });
          }
          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}; //fin initpassport

//si usamos sessions
passport.serializeUser((usuario, done) => {
  done(null, usuario);
});

passport.deserializeUser((usuario, done) => {
  done(null, usuario);
});
