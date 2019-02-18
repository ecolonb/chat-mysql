const pool = require('../database/database.js');
let truncate = false;
if (truncate == false) {
    truncate = true;
    truncateTable()
}
async function truncateTable() {
    const truncateTable_ = await pool.query('truncate chat.users_socket');
    return truncateTable_;
}

// Funtion to export
const setUserScokect = async(userId, socketId) => {
    const qrySQL = `INSERT INTO chat.users_socket (id_socket,id_user) VALUES ('${socketId}',${userId})`;
    const insertSocket = await pool.query(qrySQL);
    return true
}

// Function to export
const deleteSocketSession = async(idSocket) => {
    const qrySql = `DELETE FROM chat.users_socket WHERE id_socket = '${idSocket}'`
    const socketDelete = await pool.query(qrySql);
    return true
}

module.exports = {
    setUserScokect,
    deleteSocketSession
}