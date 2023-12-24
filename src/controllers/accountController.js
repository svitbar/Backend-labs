const prisma = require('../../prisma/prisma');

const addMoneyToAccount = async (req, res) => {
  const {userId} = req.params;
  const {amount} = req.body;

  try {
    if (amount < 0 || amount === null) {
      return res.status(400).json({message: 'Bad request'});
    }

    const existingAccount = await prisma.account.findUnique({
      where: {userId: parseInt(userId)},
    });

    if (existingAccount) {
      const updatedAccount = await prisma.account.update({
        where: {userId: parseInt(userId)},
        data: {
          balance: {
            increment: parseFloat(amount),
          },
        },
      });

      return res.status(200).json({
        message: 'Money was successfully added to the account.',
        account: updatedAccount,
      });
    } else {
      const newAccount = await prisma.account.create({
        data: {
          userId: parseInt(userId),
          balance: parseFloat(amount),
        },
      });

      return res.status(201).json({
        message: 'Money was successfully added.',
        account: newAccount,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};


const getAccountBalance = async (req, res) => {
  const {userId} = req.params;

  try {
    const isUser = await prisma.user.findUnique({
      where: {id: parseInt(userId)},
    });

    const isAccount = await prisma.account.findUnique({
      where: {userId: parseInt(userId)},
    });

    if (!isUser) {
      return res.status(404).json({message: 'User not found'});
    }

    return res.status(200).json({
      message: 'Account balance retrieved successfully.',
      balance: isAccount ? isAccount.balance : 0,
    });
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

module.exports = {
  addMoneyToAccount,
  getAccountBalance,
};
