const pool = require('./conexion');

    const agregarUsuarioBD = async (email, password, rol, lenguage) => {
        const consulta = 'INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)';
        const values = [email, password, rol, lenguage];
        try {
            await pool.query(consulta, values);
        } catch (error) {
            return false
        }
        return true
    };

    const loginBD = async (email, password) => {
        const consulta = 'SELECT * FROM usuarios WHERE email = $1 AND password = $2';
        const values = [email, password];
        try {
            const { rowCount } = await pool.query(consulta, values);
            if (!rowCount){
                return false;
            }
        } catch (error) {
            return false;
        }
       return true;
    };

    const obtenerUsuarioLogueadoBD = async (email) => {
        const consulta = 'SELECT * FROM usuarios WHERE email = $1';
        const values = [email];
        const { rows } = await pool.query(consulta, values);
        return rows[0];
    }

    module.exports = {agregarUsuarioBD, loginBD, obtenerUsuarioLogueadoBD};