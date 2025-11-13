const bcrypt = require("bcryptjs");
const { User } = require("../models");

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  console.log("🧩 Intento de login:", username);

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("❌ Usuario no encontrado");
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Compara la contraseña (acepta también texto plano si estás probando)
    const isMatch =
      (await bcrypt.compare(password, user.password)) ||
      password === user.password;

    if (!isMatch) {
      console.log("❌ Contraseña incorrecta");
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    console.log("✅ Login exitoso:", user.username);
    res.json({ id: user.id, username: user.username, name: user.name });
  } catch (error) {
    console.error("🔥 Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Crear usuario por defecto
exports.createDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ where: { username: 'admin' } });
    
    if (!existingUser) {
      await User.create({
        username: 'admin',
        password: 'admin123', // Texto plano para pruebas
        name: 'Administrador'
      });
      console.log('✅ Usuario por defecto creado: admin / admin123');
    } else {
      console.log('ℹ️  Usuario admin ya existe');
    }
  } catch (error) {
    console.error('❌ Error creando usuario por defecto:', error.message);
  }
};