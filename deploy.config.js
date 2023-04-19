module.exports = {
  apps: [
    {
      name: "JCWD-2302-03", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8304,
      },
      time: true,
    },
  ],
};
