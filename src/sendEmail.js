import axios from "axios"

const sendEmail = async (report) => {

  const today = new Date();

  const postData = {
    personalizations: [
      {
        to: [{ email: "ttungcoding@kakao.com", name: "ttundcoding" }],
        subject: `Daliy Dividend Yiled Report[${today.toLocaleDateString()}]`,
      },
    ],
    content: [{ type: "text/html", value: report }],
    from: { email: "ttungcoding@kakao.com", name: "ttundcoding" },
  }

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${process.env.SNEDGRID_KEY}`,
      "content-type": "application/json",
    },
  }

  return await axios
    .post("https://api.sendgrid.com/v3/mail/send", postData, axiosConfig)
    .then((response) => {
      const { status, statusText } = response
      console.log(`send e-mail status : ${status}, statusText: ${statusText}`)
    })
    .catch((errer) => {
      console.log(errer);
    });
}

export default sendEmail