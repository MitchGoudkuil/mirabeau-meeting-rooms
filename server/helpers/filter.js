function filterData(data) {
  let tempConfig = {
    minTemp: 23,
    minMicLevel: 25,
    minLighting: 18000
  }

  let checkTemperature = temp => {
    let newTemp = (temp / 1000).toFixed(1)
    return {
      celcius: newTemp,
      svg: newTemp > tempConfig.minTemp ? true : false
    }
  }

  let dataObj = data.map(item => {
    return {
      roomName: item.room_name,
      occupation: item.measurements.occupancy,
      micLevel:
        Math.floor(item.measurements.mic_level / 100) === tempConfig.minMicLevel
          ? true
          : false,
      decibels: Math.floor(item.measurements.mic_level / 100),
      roomTemp: checkTemperature(item.measurements.temperature),
      uvLight:
        item.measurements.ambient_light > tempConfig.minLighting ? true : false
    }
  })
  return dataObj
}

module.exports.filterData = filterData
