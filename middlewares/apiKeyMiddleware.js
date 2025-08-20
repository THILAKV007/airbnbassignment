

//apiKeyMiddleware
const apiKeyMiddleware = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey && apiKey == process.env.X_API_KEY) {
        try {

            next();
        }
        catch (err) {
            return res.status(401).json({
                message: 'Invalid api key'
            });
        }
    } else {
        return res.status(401).json({
            message: 'API key is missing'
        });
    }
}

module.exports = apiKeyMiddleware;