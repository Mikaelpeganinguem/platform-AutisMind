const DatabaseQuery = require('../DatabaseQuery');

class ChatQuerys extends DatabaseQuery {
    /**
     * Retrieves all chats for a specific user
     * @param {number} user_id - The ID of the user
     * @returns {Promise<Array>} - List of chats
     */
    async getAllChats(user_id) {
        const sql = 'SELECT * FROM chat WHERE user_id = ? ORDER BY `date` DESC';
        const values = [user_id];
        return this.executeQuery(sql, values);
    }

    /**
     * Adds a new chat to the database
     * @param {string} date - The date of the chat
     * @param {number} user_id - The ID of the user
     * @param {number} character_id - The ID of the character
     * @returns {Promise<void>}
     */
    async addChat(date, user_id, character_id) {
        const sql = 'INSERT INTO chat (`date`, user_id, character_id) VALUES (?, ?, ?)';
        const values = [date, user_id, character_id];
        return this.executeQuery(sql, values);
    }

    /**
     * Deletes a chat by its ID
     * @param {number} chat_id - The ID of the chat
     * @returns {Promise<void>}
     */
    async deleteChat(chat_id) {
        const sql = 'DELETE FROM chat WHERE id = ?';
        const values = [chat_id];
        return this.executeQuery(sql, values);
    }
}

module.exports = new ChatQuerys();