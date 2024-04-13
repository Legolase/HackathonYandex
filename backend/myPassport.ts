import myPassport from "passport";
import {githubStrategy} from "./strategies/github";
import {User} from "./models/User";


myPassport.use(githubStrategy);
myPassport.serializeUser((profile, done) => {
    // TODO: CHANGE TYPE!!!
    let user = profile as User;
    done(null, user.id);
});
myPassport.deserializeUser((id: string, done) => {
    let user = new User().getById(id, User);
    done(null, user);
});

export {myPassport};
