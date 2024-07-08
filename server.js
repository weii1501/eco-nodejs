const app = require('./src/app');

const PORT = process.env.PORT || 7979;

const server = app.listen(PORT, () => {
    console.log(`WSV eCommerce start with port ${PORT}`);
});

process.on('uncaughtException', async (error) => {
    // server.close(() => {
    //     console.log('WSV eCommerce closed');
    // });
    console.log('Error', error);
    process.exit(1);
    // notify.send(...ping)
});