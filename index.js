const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')

// DB
const servicesAccount = require('./hentai-933b6-firebase-adminsdk-9fbvj-b67cf409c0.json')
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(servicesAccount),
    databaseURL: "https://hentai-933b6.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();


let PORT = 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", async (res, resp) => {
    resp.send("Hello World");
})

app.post("/createuser", async (res, resp) => {
    try {
        if (res.body != null) {
            let user = await auth.createUser(res.body)
            resp.status(200).send(user);
        }else{
            resp.status(500).send({status:"Missing Value"})
        }
    } catch (error) {
        console.log(error)
        resp.status(500).send({status:"Fail"})

    }

})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})