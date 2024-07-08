'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000


const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log('Number of Connections', numConnection);
}

const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Example maxinum Connection based on number of cores
        const maxConnection = numCores * 5;

        console.log(`Active Connection: ${numConnection}`);
        console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`);
        
        if (numConnection > maxConnection) {
            console.log('Overload Connection');
            process.exit(1);
        }
        
    }, _SECONDS)
}

module.exports = {
    countConnect,
    checkOverload
}