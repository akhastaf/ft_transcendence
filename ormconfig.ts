export default {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "pongapp",
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/migrations/*.js'],
    cli: {
        migrationDir: 'src/migrations'
    },
}