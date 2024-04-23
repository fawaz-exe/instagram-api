require("dotenv").config();
const fs = require('fs')
const util = require('util')
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');

// const readFileASync = fs.readFile(path)

// var path = './images/images.jpeg';
var path = 'https://picsum.photos/800/800';



const postToInsta = async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    console.log(JSON.stringify(auth));

    const imageBuffer = await get({
        url: path,
        encoding: null, 
    });

    const publishResult = await ig.publish.photo({
        file: imageBuffer, // image buffer, you also can specify image from your disk using fs
        caption: 'Really nice photo from the internet! 💖', // nice caption (optional)
      });

      console.log(publishResult);
}

// const cronInsta = new CronJob("30 * * * * *", async () => {
//     postToInsta();
// });

// cronInsta.start();

postToInsta();

