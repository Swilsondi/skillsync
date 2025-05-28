// 404 handler for unmatched routes this is middleware
module.exports = (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Route ${req.originalUrl} not found`
    });
};