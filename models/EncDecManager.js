const { createCipher, randomBytes, createDecipher } = require('crypto');

const key = process.env.CRYPTO_SECRET_KEY;

const encrypt = (userPass) =>
{
    const iv = randomBytes(16);

    const cipher = createCipher('aes256', key);

    const encryptedMessage = cipher.update(userPass, 'utf8', 'hex') + cipher.final('hex');
    console.log(`Encrypted: ${encryptedMessage}, iv: ${iv}`);

    return {
        iv,
        encryptedPassword: encryptedMessage
    }     
}

const decrypt = (encrypted, ivstring) =>
{
    const decipher = createDecipher('aes256', key);
    console.log("decipher",decipher);
    const decryptedPassword = decipher.update(encrypted, 'hex', 'utf-8') + decipher.final('utf8');
    console.log(`Deciphered: ${decryptedPassword.toString('utf-8')}`);

    return decryptedPassword;
}

module.exports = { encrypt, decrypt };