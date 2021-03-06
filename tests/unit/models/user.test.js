const {
  User
} = require('../../../src/models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('app.jwtPrivateKey'));
    //expect(decoded).toMatchObject(payload);
    expect(decoded).not.toBeNull()
    expect(decoded.id).toBe(payload._id)
  });
});