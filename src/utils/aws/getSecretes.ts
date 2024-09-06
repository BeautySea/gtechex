// import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

// const client = new SecretsManagerClient({ region: "us-east-1" }); // Replace with your region

// export async function getSecret() {
//   try {
//     const response = await client.send(
//       new GetSecretValueCommand({ SecretId: import.meta.env.VITE_AWS_SECRET_MANAGER_ID, VersionStage: "AWSCURRENT" })
//     );
//     return response.SecretString;
//   } catch (error) {
//     console.error("Error retrieving secret:", error);
//     throw error; // Or handle the error differently (e.g., display an error message to the user)
//   }
// }
