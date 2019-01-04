#!/usr/bin/env nodejs
module.paths.push('/usr/local/lib/node_modules');

const MQTT = require('mqtt')
const { Client } = require('pg')

const mqtt_client = MQTT.connect('mqtt://localhost')

const pg_client = new Client({
  user: 'smartfoosball',
  host: 'localhost',
  database: 'smartfoosball',
  password: 'password123',
  port: 5432,
})
pg_client.connect()

mqtt_client.on('connect', () => {
  mqtt_client.subscribe('sensors/#')
})

mqtt_client.on('message', (topic, message) => {
  //console.log(message.toString());
  var sensor = topic.substr(topic.indexOf('/')+1)

  //const json = '{"result":true,"count":1}' || {};
  const { timestamp, value } = JSON.parse(message);

  //console.log(sensor);
  //console.log(timestamp);
  //console.log(value);

  const query = {
    text: 'INSERT INTO events(happened_at, value, sensor_id) VALUES($1, $2, $3)',
    values: [timestamp, value, 1]
  }
  pg_client.query(query)
    .then()
    .catch(e => console.error(e.stack))
})
