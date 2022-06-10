const conn = require("../config/dbConnection");

const { Storage } = require("@google-cloud/storage");


const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE,
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

exports.uploadImage = (file) => new Promise((resolve,reject)=> {
  const {originalname,buffer} = file;
  const blob = bucket.file(originalname.replace(/ /g, "_"));
  const blobStream = blob.createWriteStream();

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
   
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
});
