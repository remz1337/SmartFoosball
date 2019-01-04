#!/usr/bin/env nodejs
module.paths.push('/usr/local/lib/node_modules');

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')

client.on('connect', () => {
  client.subscribe('sensors/#')
})

client.on('message', (topic, message) => {
  console.log(message.toString());
})
