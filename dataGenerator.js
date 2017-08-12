const rapid = require('rapid-io') // RequireJS
const rapidClient = rapid.createClient('NDA1OWE0MWo1b3AzYTJwLnJhcGlkLmlv')
// const sleep = require('sleep')

let currentTime = Date.now();

function tc1Generator() {
  return (Math.random() * 2) + 14;
}

function tc2Generator() {
  return tc1Generator() + (Math.random() * 2);
}

function batteryVoltageGenerator() {
  return 4.2 - Math.random() * 0.01;
}

function millisSinceHeatPulseGenerator() {
  if (Date.now() >= currentTime + 1800000000){
    currentTime = Date.now();
    return 0;
  } else {
    return Date.now() - currentTime;
  }
}

function sendDataToRapidIO_node1() {
  rapidClient
    .collection('data-loggers-4')
    .newDocument()
    .mutate({unix_timestamp: Math.floor(Date.now()/1000), tc1: tc1Generator(), tc2: tc2Generator(), batteryVoltage: batteryVoltageGenerator(), millisSinceHeatPulse: millisSinceHeatPulseGenerator(), nodeID: '1'})
    .then(
      () => {
        console.log('success node1')
      },
      err => {
        if (err) {
          switch (err.type) {
            case 'timeout': break // mutation timed out
            case 'permission-denied': break // access control related error
          }
        } 
    })
}

// function sendDataToRapidIO_node2() {
//   rapidClient
//     .collection('data-loggers-all-2')
//     .newDocument()
//     .mutate({unix_timestamp: Math.floor(Date.now()/1000), tc1: tc1Generator(), tc2: tc2Generator(), batteryVoltage: batteryVoltageGenerator(), millisSinceHeatPulse: millisSinceHeatPulseGenerator(), nodeID: '2'})
//     .then(
//       () => {
//         console.log('success node2')
//       },
//       err => {
//         if (err) {
//           switch (err.type) {
//             case 'timeout': break // mutation timed out
//             case 'permission-denied': break // access control related error
//           }
//         } 
//     })
// }

// function sendDataToRapidIO_node3() {
//   rapidClient
//     .collection('data-loggers-all-2')
//     .newDocument()
//     .mutate({unix_timestamp: Math.floor(Date.now()/1000), tc1: tc1Generator(), tc2: tc2Generator(), batteryVoltage: batteryVoltageGenerator(), millisSinceHeatPulse: millisSinceHeatPulseGenerator(), nodeID: '3'})
//     .then(
//       () => {
//         console.log('success node3')
//       },
//       err => {
//         if (err) {
//           switch (err.type) {
//             case 'timeout': break // mutation timed out
//             case 'permission-denied': break // access control related error
//           }
//         } 
//     })
// }

setInterval(sendDataToRapidIO_node1, 2000);
// setInterval(sendDataToRapidIO_node2, 2000);
// setInterval(sendDataToRapidIO_node3, 2000);
