const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: "mysql-private-db.cahh4sebpiaj.us-east-2.rds.amazonaws.com",
  user: "root",
  password: "rootroot",
  database: "masyanya-vpc-db",
});

exports.handler = async (event) => {
  const { sensor_id, sensor_type, sensor_name, api_key, sensor_data } = event;
  console.log(`Sensor data: ${sensor_data}`);
  let response = {};

  // const query = `INSERT INTO sensors_data ( ${`sensor_id`}, ${`sensor_type`}, ${`sensor_name`}, ${`api_key`}, ${`sensor_data`}) VALUES ( '${sensor_id}', '${sensor_type}', '${sensor_name}', '${api_key}', '${sensor_data}');`;
  // pool.query(query, (err, results, fields) => {
  //   if (err) {
  //     const response1 = { data: null, message: err.message };
  //       response = {
  //         statusCode: 404,
  //         body: JSON.stringify(response1),
  //       };
  //       console.log(response);
  //       return response;
  //   }

  //   const { insertId } = results;
  //   const bus_data = {
  //     sensor_id,
  //     sensor_type,
  //     sensor_name,
  //     api_key,
  //     sensor_data,
  //   };
  //   const response1 = {
  //     data: bus_data,
  //     message: `Bus data ${insertId} successfully added.  `,
  //   };
  //   response = {
  //         statusCode: 201,
  //         body: JSON.stringify(response1),
  //       };
  //       console.log(response);
  //       return response;
  // });

  const query = `UPDATE sensors_data SET sensor_type='${sensor_type}', sensor_name='${sensor_name}', api_key='${api_key}', sensor_data='${sensor_data}' WHERE sensor_id='${sensor_id}'`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response1 = { data: null, message: err.message };
      response = {
        statusCode: 404,
        body: JSON.stringify(response1),
      };
      console.log(response);
      return response;
    }

    const bus_data = {
      sensor_id,
      sensor_type,
      sensor_name,
      api_key,
      sensor_data,
    };
    const response1 = {
      data: bus_data,
      message: `Bus data ${sensor_id} is successfully updated.`,
    };

    response = {
      statusCode: 201,
      body: JSON.stringify(response1),
    };
    console.log(response);
    return response;
  });
};
