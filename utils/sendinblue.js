require('dotenv').config()
const SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  process.env.SENDINBLUE_API_KEY;
exports.mailSender = async function({email,subject,content:{otp},callback}) {
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
    sendSmtpEmail = {
      sender: { email: "app.myblog@gmail.com" },
      to: [
        {
          email ,
          name: "Person Name",
        },
      ],
      subject,
      textContent: otp+'',
    };
    try{
      let data = await apiInstance.sendTransacEmail(sendSmtpEmail)
      if(data){
        callback(null,data)
      }
    }catch(error){
      console.log("..error",error)
      callback(error,)
    }
  }
