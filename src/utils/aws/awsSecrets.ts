import AWS from 'aws-sdk';

export const fetchCredentials = async () => {
    try {
      // Create a Secrets Manager client
      const secretsManager = new AWS.SecretsManager({ region: import.meta.env.VITE_AWS_REGION });
  
      // Retrieve the secret value
      console.log('import.meta.env.VITE_AWS_SECRET_MANAGER_ID', import.meta.env.VITE_AWS_SECRET_MANAGER_ID);
      
      const data = await secretsManager.getSecretValue({ SecretId: import.meta.env.VITE_AWS_SECRET_MANAGER_ID }).promise();
  
      // Parse the secret value (assuming it's JSON)
      if (data?.SecretString) {
        const secret = JSON.parse(data.SecretString);
        return secret; // Return the parsed secret
    } else {
        console.error('SecretString is undefined or null.');
        return null;
    }
  
      // Set the credentials state
    //   setCredentials(secret);
    } catch (error) {
      console.error('Error fetching credentials:', error);
    }
  };