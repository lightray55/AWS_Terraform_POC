const AWS = require("aws-sdk"); // using the SDK
const INCIDENT_TABLE = "tf-incident-table"; // obtaining the table name

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {
   // create a new object
  currentDate = Date.now();
  expiryDate = currentDate.setDate(currentDate.getDate() + 7)
  const body = event.body;var newIncident = {
    ...body,
    incidentId: Date.now(),
    expiryPeriod: expiryDate, // specify TTL
  };
  
  // check that the password is correct
  if(event.body.password == "MattAndDansSuperSecretPassword") {
    //remove the password from the object so we don't store it in the database
    delete newIncident.password
    
    // insert the new incident into the table
    await documentClient
    .put({
        TableName: INCIDENT_TABLE,
        Item: newIncident,
        })
    .promise();
        
    // return the created object
    return {statusCode: 200,body: JSON.stringify(newNote), 
    };
  } else {
    // if password is incorrect - return error
    return {statusCode: 500,body: '{"error":"Invalid Password"}'} 
  }
};