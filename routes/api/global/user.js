class user {
  constructor(id, name, email, password, phone, address, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.role = role;
  }
}

module.exports = user;
