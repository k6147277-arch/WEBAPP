// javascript/login.js

document.addEventListener('DOMContentLoaded', () => {
    // 💡 CORREGIDO: Ahora el ID del formulario en el HTML debe ser 'formulario-login'
    const formularioLogin = document.getElementById('formulario-login'); 
    
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', manejarLogin);
    } else {
        console.error("No se encontró el formulario con ID 'formulario-login'.");
    }
});

async function manejarLogin(event) {
    event.preventDefault();

    // Estos IDs están correctos si están definidos en el HTML
    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value; 
    
    // El div de mensaje ahora existe en el HTML (ver corrección 1)
    const mensajeDiv = document.getElementById('mensaje-login'); 
    const botonLogin = document.querySelector('button[type="submit"]');

    mensajeDiv.textContent = '';
    botonLogin.disabled = true;
    botonLogin.textContent = 'Iniciando...';

    const API_URL = 'http://localhost:3000/api/login'; 

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await response.json();

        if (response.ok) {
            mensajeDiv.textContent = data.message || "Inicio de sesión exitoso.";
            // Quitamos clases de Tailwind si no estás usándolo, solo para depurar.
            // mensajeDiv.className = 'text-green-600 font-bold mb-4'; 

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId); 
            
            // 💡 CORRECCIÓN MENOR: Usamos 'Inicio.html' (mayúscula) para ser consistente con el server.js
            window.location.href = data.redirectUrl || 'Inicio.html';

        } else {
            // Error de autenticación
            mensajeDiv.textContent = data.message || "Credenciales incorrectas o error desconocido.";
            // mensajeDiv.className = 'text-red-600 font-bold mb-4';
        }
    } catch (error) {
        console.error('Error de red/servidor:', error);
        mensajeDiv.textContent = 'Error: No se pudo conectar con el servidor (¿Está encendido en el puerto 3000?).';
        // mensajeDiv.className = 'text-red-600 font-bold mb-4';
    } finally {
        botonLogin.disabled = false;
        // 💡 CORRECCIÓN: Vuelve al texto correcto
        botonLogin.textContent = 'Inicar Sesion'; 
    }
}