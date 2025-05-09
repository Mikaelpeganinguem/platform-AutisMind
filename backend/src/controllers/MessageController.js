const query = require('../database/querys/MessageQuerys');
const queryUser = require('../database/querys/UserQuerys');

class MessageController {
    async getAllMessagesByUser(req, res) {
        try {
            const { userId } = req.params;
            const user = await queryUser.getUserId(userId); // Fetch user by ID from the database

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const messages = await query.getAllMessagesByUser(userId);
            res.status(200).json({ messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async getAllMessageByChat(req, res) {
        try {
            const { chatId } = req.params;
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ message: 'userId is required' });
            }

            const user = await queryUser.getUserId(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const messages = await query.getAllMessageByChat(userId, chatId);
            res.status(200).json({ messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async postNewMessage(req, res) {
        try {
            const { id: chat_id } = req.params;
            const { shipping_date, user_id, content, sent_by } = req.body;
            if (!shipping_date || !user_id || !content || !sent_by) {
                return res.status(400).json({ message: 'shipping_date, user_id, content and sent_by are required' });
            }

            const chat = await query.getAllMessageByChat(user_id, chat_id);
            if (!chat) {
                return res.status(400).json({ message: 'chat not found' });
            }

            const user = await queryUser.getUserId(user_id);
            if (!user) {
                return res.status(400).json({ message: 'user not found' });
            }

            await query.addMessage(shipping_date, user_id, chat_id, content, sent_by);
            res.status(200).json({ message: 'message registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }

    async deleteMessage(req, res) {
        try {
            const { id: messageId } = req.params;

            if (!messageId) {
                return res.status(400).json({ message: 'messageId is required' });
            }

            const message = await query.deleteMessage(messageId);
            if (!message) {
                return res.status(404).json({ message: 'Message not found' });
            }

            res.status(200).json({ message: 'Message deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message || error });
        }
    }
}

module.exports = new MessageController();