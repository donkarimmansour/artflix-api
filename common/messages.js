
const {Host} = require("./apiEndpoints")

const resetPasswordMsg = (newPass) => {
    const html = `<h1>Hi User</h1>
    <br><br> 
    <h2>new Password</h2>
    <br><br>
     password = ${newPass} `
    return html ;
}




const confimEmailMsg = (id) => {
    const html = `<h1>Hi User</h1>
    <br><br> 
    <h2>Thanks for your registration</h2>
    <h3>Please Verify Your Email by clicking the following link</h3>
    <br><br>
    <a style='text-decoration:none;' 
     href="${Host.FRONTEND}/login/${id}">
    Click Here to confirm your email</a>` ;
    return html ;
}






module.exports = {
    resetPasswordMsg ,
    confimEmailMsg
}
