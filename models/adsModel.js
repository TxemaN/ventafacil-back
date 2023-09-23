const querieEntries = require('./queries.js')
const {pool} = require('../utils/connectPool')

const getAllAds= async ()=> {
  let client , result;
  try {
      client = await pool.connect();
      const data = await client.query(querieAds.byAll);
      result = await data.rows
  } catch (error) {
      console.log(error);
      throw new Error('error')
  } finally {
      client.release()
  }
  return result;
  };

  
  module.exports = {
    getAllAds
  }