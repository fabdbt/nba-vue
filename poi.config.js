module.exports = (options, req) => ({
  entry: './src/main.js',
  port: 8080,
  html: {
    title: 'NBA scores',
    description: 'A simple Vue project that displays daily NBA scores'
  }
})
