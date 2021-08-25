const util = require('util')
const AWS = require('aws-sdk')

// Add supported extensions, for example '.jpg'.
// Leave empty to allow any extension.
const SUPPORTED_EXTENSIONS = []

// Set maximum file size.
// Set to 0 to disable file size check.
const MAX_FILE_SIZE = 0

// Implicitly injected by Altostra during deployment.
const QUEUE = process.env.QUEUE_JOBSQUEUE

const sqs = new AWS.SQS()

module.exports.handler = async (event, context) => {
  console.log("Handling file.", util.inspect(event, { depth: 5 }))

  const s3data = event.Records[0].s3
  const key = decodeURIComponent(s3data.object.key.replace(/\+/g, " "))

  try { validateFile(key) } catch (err) {
    console.log(err.message)
    return
  }

  // This file claim (reference) is sent as part of the job message
  // for job workers to reference.
  const fileClaim = {
    bucketArn: s3data.bucket.arn,
    bucketName: s3data.bucket.name,
    objectKey: s3data.object.key
  }

  const jobMessage = {
    id: s3data.object.key,
    file: fileClaim,
    timestamp: Date.now()
  }

  try {
    const result = await sqs.sendMessage({
      QueueUrl: QUEUE,
      MessageBody: JSON.stringify(jobMessage)
    }).promise()

    console.log(`Job message sent.`, result.MessageId)
  } catch (err) {
    console.log(`Failed to send job message to queue.`, err)
  }
}

function validateFile(key) {
  if (!Array.isArray(SUPPORTED_EXTENSIONS) || SUPPORTED_EXTENSIONS.length < 1) { return }

  const fileExt = key.match(/\.([^.]*)$/)
  if (!fileExt) {
    throw new Error(`File validation failed: can't detect file extension.`)
  }

  const imageType = fileExt[1].toLowerCase()
  if (!SUPPORTED_EXTENSIONS.includes(imageType)) {
    throw new Error(`File validation failed: unsupported image type: ${imageType}.`)
  }

  const size = s3data.object.size
  if (MAX_FILE_SIZE > 0 && size > MAX_FILE_SIZE) {
    throw new Error(`File validation failed: file size is ${size}, which is over the limit ${MAX_FILE_SIZE}.`)
  }
}