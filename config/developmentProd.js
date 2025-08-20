module.exports = {
    port: process.env.port || 5000,
    db: `mongodb+srv://${process.env.db_name}:${process.env.db_password}@cluster0.xnv0wor.mongodb.net/Airbnb?retryWrites=true&w=majority&appName=Project`,
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    passPhrase: process.env.PASS_PHRASE,
	algorithm: process.env.ALGORITHM,
	iv: process.env.IV,
    serverType: "http",
    options: {
        // 
    },
}