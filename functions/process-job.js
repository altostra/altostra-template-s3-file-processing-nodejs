const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3()

const TableName = process.env.TABLE_RESULTSTABLE

module.exports.handler = async (event, context) => {
  console.log(`Processing job.`)

  for (const record of event.Records) {
    let message
    try {
      message = JSON.parse(record.body)
    } catch (err) {
      console.log(`Discarding job. Failed to JSON parse the message.`, record)
      continue
    }

    let file
    try {
      file = await s3.getObject({
        Bucket: message.file.bucketName,
        Key: message.file.objectKey
      }).promise()
    } catch (err) {
      console.log(`Failed to get file data.`, err)
      return
    }

    let result
    try {
      result = await doWork(message, file)
    } catch (err) {
      console.log(`Job processing failed.`, err)
      throw err
    }

    // TODO: DynamoDB table is used to store results for demo purposes. You can replace it with any 
    // kind of further processing you wish. For example, you can store the results in another S3 bucket, 
    // a SQL database, send it as a message, etc.
    try {
      await ddb.put({
        TableName,
        Item: {
          pk: `${message.file.objectKey}#${message.timestamp}`,
          result,
          file: message.file
        }
      }).promise()
    } catch (err) {
      console.log(`Failed to store results in ${TableName}.`)
      throw err
    }
  }
}

async function doWork(message, file) {
  // TODO: Replace this placeholder code with your own.

  console.log(`Doing work...`)
  return {
    data: 'placeholder result'
  }
}