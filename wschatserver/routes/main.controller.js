import {Router} from 'express';
import { User } from '../model/user.js';

let users = [];

const router = Router();

router.post('/signin', function(req, res) {
    let foundIdx = users.findIndex(e => e.userName == req.body.userName);
    if(foundIdx > -1) {
        throw new Error('이미 존재하는 ID입니다. 다른 아이디로 다시 접속해주세요.');
    } else {
        let user = new User(req.body.userName, req.headers.referer);
        users.push(user);
        res.json({"message" : "접속합니다.", "success" : true});
    }
});

export {
    router,
    users
}