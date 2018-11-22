const bcrypt = require('bcrypt');

class harshing {
  static toharsh(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static checkharsh(password, hash) {
    const crypted = bcrypt.compareSync(password, hash);
    return crypted;
  }
}

export default harshing;
