import passportGithub from "passport-github";
import {User} from "../models/User";
import {s3} from "../index";
import {Identicon} from "../facades/Identicon";

async function downloadImageToBuffer(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer); // Преобразование ArrayBuffer в Buffer
}


export const githubStrategy = new passportGithub.Strategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        callbackURL: '/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        let name = profile.name?.givenName || profile.username || '';
        let githubId = profile.id;
        let login = profile.username ? profile.username : '';
        let email = profile.emails ? profile.emails[0].value : '';
        let photo = profile.photos ? profile.photos[0].value : '';
        let user = await new User().getOne(User, {github_id: githubId});
        let filePath = null;
        if (!user) {
            let fileBuffer: Buffer;
            if (photo) {
                fileBuffer = await downloadImageToBuffer(photo);
            } else {
                fileBuffer = Identicon.generateImage(githubId, 150);
            }
            filePath = await s3.uploadFile(fileBuffer, '/avatar/');
            user = new User();
            user.datetime_last_activity = new Date();
            user.name = name;
            user.github_id = githubId;
            user.login = login;
            user.email = email;
            user.avatar = filePath?.Location;
            user = await user.create(User);
        }
        if (!user) {
            done(null, false);
            return;
        }
        done(null, user);
    }
);

module.exports = {githubStrategy}