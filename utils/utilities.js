const bcrypt = require('bcrypt')

function otpGenerator(min=100000, max=999999) {
    return Math.floor(Math.random() * (max - min) + min);
  }

const encryptPassword= async(plainPassword) =>{
  try{
    let hash = await bcrypt.hash(plainPassword, 10);
    return hash
  }catch(e){
    console.log('>>>>>err',e)
  }
}

module.exports = {
    otpGenerator,
    encryptPassword
}