import Factory from 'test/factories';
import User from 'server/models/user';
import Auth from 'server/controllers/auth';
import config from 'config';
import jwt from 'jsonwebtoken';


class UserFactory extends Factory {
  constructor () {
    super();
    this.Model = User;
  }

  defaults () {
    this.counter += 1;

    return {
      username: `testuser${this.counter}`,
      password: 123456,
      created: new Date(),
      full_name: 'Test User${this.counter}',
      image_url: '/images/default_avatar.jpg',
    };
  }

  postCreate (item) {
    return new Promise((resolve, reject) => {
      item.token = Auth.prototype.generateToken(item);
      resolve(item);
    }).catch((err) => { console.log(err) });
  }
}

export default new UserFactory();