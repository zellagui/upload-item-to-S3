const {S3} = require('aws-sdk');

exports.s3upload = async (file) => {
   
    const s3 = new S3();

    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${file.originalname}`,
        Body: file.buffer
    }
    return await s3.upload(param).promise();
}