import { IMovieSanitized } from 'types/IMovie';
import { transporter } from 'email/nodemailer';

function splitStringIntoLines(str: string, charsPerLine: number) {
  const chunks = [];

  for (let i = 0; i < str.length; i += charsPerLine) {
    chunks.push(str.slice(i, i + charsPerLine));
  }

  return chunks.join('\n');
}

export function sendEmail(data: IMovieSanitized) {
  const emailBody = `
    "${data.title}" movie is added to the system.

    Description:

    ${splitStringIntoLines(data.description, 50)}


    Genres: ${data.genres.map((genre) => genre.name)},
  `;

  const mailOptions = {
    from: 'sandbox.smtp.mailtrap.io',
    to: 'johndoe@gmail',
    subject: `Movie ${data.title} created!`,
    text: emailBody,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
