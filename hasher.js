const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Puedes ajustar el número de rondas de salt según tus necesidades
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(`Hashed Password: ${hashedPassword}`);
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
    }
};

// Reemplaza 'your_password_here' con la contraseña que deseas hashear
hashPassword('your_password_here');
