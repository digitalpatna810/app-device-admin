module.exports = {
    apps: [
      {
        name: "device-manager-backend",
        script: "src/main.tsx",
        watch: "true",
        interpreter: "ts-node", // Use ts-node as the interpreter
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  