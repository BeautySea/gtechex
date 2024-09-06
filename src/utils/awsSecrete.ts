/* eslint-disable no-useless-catch */
// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
  
  const secret_name = "QuickApply_main_backend_creds";
  
  const client = new SecretsManagerClient({
    region: "us-east-1",
  });
  

  
 export const getCredentials = async() => {
    let response;
    try {
        response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );
        console.log('response', response);
        
        const secret = response.SecretString;
        return secret
      } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        console.log('error', error);
        
        throw error;
      }
     
 }
  