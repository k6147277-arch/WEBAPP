// services/login-services.js

class LoginService {
    /**
     * Simula la verificación de credenciales de un usuario.
     * @param {string} email - Correo del usuario.
     * @param {string} password - Contraseña del usuario.
     * @returns {object} - { exito: boolean, mensaje: string, userId: number }
     */
    async login(email, password) {
        // Credenciales de prueba definidas en tu server.js:
        const TEST_EMAIL = "paciente@test.com";
        const TEST_PASSWORD = "12345";
        const TEST_USER_ID = 42; // ID ficticio para el usuario

        if (email === TEST_EMAIL && password === TEST_PASSWORD) {
            return {
                exito: true,
                mensaje: "Autenticación exitosa. Redirigiendo...",
                userId: TEST_USER_ID 
            };
        } else {
            return {
                exito: false,
                mensaje: "Credenciales incorrectas. Verifique email y contraseña."
            };
        }
    }
}

module.exports = LoginService;