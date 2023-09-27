/**
 * @module queriesUser
 * @description Este módulo contiene queries para operaciones relacionadas con la base de datos de users.
 */

/**
 * @typedef {Object} User
 * @property {number} ID - El ID único del user.
 * @property {string} Nombre - El nombre del user.
 * @property {string} Apellidos - Los apellidos del user.
 * @property {string} Username - El nombre de user (único).
 * @property {string} Email - El correo electrónico del user (único).
 * @property {string} Rol - El rol del user.
 * @property {number} Contacto - El número de contacto del user.
 * @property {string} Provincia - La provincia del user.
 * @property {string} Ciudad - La ciudad del user.
 */

/**
 * @typedef {Object} queriesUser
 * @property {string} criarUser - Query para insertar un nuevo user en la base de datos.
 * @property {string} mostrarTodosUsers - Query para buscar todos los users en la base de datos.
 * @property {string} buscarPorEmail - Query para buscar un user por correo electrónico.
 * @property {string} buscarPorId - Query para buscar un user por ID.
 * @property {string} buscarPorUsername - Query para buscar un user por nombre de user.
 * @property {string} actualizarUser - Query para actualizar los datos de un user.
 * @property {string} deletarUser - Query para eliminar un user de la base de datos.
 */

const queriesUser = {
    /**
     * Query para insertar un nuevo user en la base de datos.
     * @type {string}
     */
    criarUser: `
    INSERT INTO usuarios (
        nombre,
        apellidos,
        username,
        email,
        rol,
        contacto,
        provincia,
        ciudad,
        pin
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *;
`,

    /**
     * Query para buscar todos los users en la base de datos.
     * @type {string}
     */
    mostrarTodosUsers: `
        SELECT * FROM usuarios;
    `,

    /**
     * Query para buscar un user por correo electrónico.
     * @type {string}
     */
    buscarPorEmail: `SELECT * FROM usuarios WHERE Email = $1;
    `,

    /**
     * Query para buscar un user por ID.
     * @type {string}
     */
    buscarPorId: `
        SELECT * FROM usuarios WHERE ID = $1;
    `,

    /**
     * Query para buscar un user por nombre de user.
     * @type {string}
     */
    buscarPorUsername: `
        SELECT * FROM usuarios WHERE Username = $1;
    `,

    /**
     * Query para actualizar los datos de un user.
     * @type {string}
     */
    actualizarUser: `
    UPDATE usuarios 
    SET 
        nombre = $2, 
        apellidos = $3, 
        username = $4, 
        email = $5, 
        rol = $6, 
        contacto = $7, 
        provincia = $8, 
        ciudad = $9
    WHERE 
        id = $1
    RETURNING *;
`,

    /**
     * Query para eliminar un user de la base de datos.
     * @type {string}
     */
    deletarUser: `
        DELETE FROM usuarios WHERE ID = $1;
    `
 
};

module.exports = { queriesUser };
