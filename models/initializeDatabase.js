const db = require('./db');

const initializeDatabase =  () => {
    db.execute(`
        CREATE TABLE IF NOT EXISTS participants_additional_info (
            id INT PRIMARY KEY AUTO_INCREMENT,
            participant_id INT NOT NULL,
            key_info VARCHAR(100) NOT NULL,
            value_info TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (participant_id) REFERENCES participants(id)
        );
    `, (err) => {
        if (err) return console.error("Error saat membuat tabel 'participants_additional_info': ", err);
        console.log("Tabel 'participants_additional_info' berhasil dibuat atau sudah ada.");
    });
};

module.exports = initializeDatabase;