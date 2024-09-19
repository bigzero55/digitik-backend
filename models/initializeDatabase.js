const db = require('./db');

const initializeDatabase = () => {
    // Tabel 'users'
    db.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password TEXT NOT NULL,
            role ENUM('admin', 'user') DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `, (err) => {
        if (err) return console.error("Error saat membuat tabel 'users': ", err);
        
        // Tabel 'participants' dibuat setelah 'users' selesai
        db.execute(`
            CREATE TABLE IF NOT EXISTS participants (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                user_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `, (err) => {
            if (err) return console.error("Error saat membuat tabel 'participants': ", err);
            
            // Tabel 'participants_additional_info' dibuat setelah 'participants' selesai
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

                // Tabel 'events' dibuat setelah 'participants_additional_info' selesai
                db.execute(`
                    CREATE TABLE IF NOT EXISTS events (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        title VARCHAR(100) NOT NULL,
                        description TEXT NOT NULL,
                        start_date DATE NOT NULL,
                        end_date DATE NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    );
                `, (err) => {
                    if (err) return console.error("Error saat membuat tabel 'events': ", err);

                    // Tabel 'reservations'
                    db.execute(`
                        CREATE TABLE IF NOT EXISTS reservations (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            event_id INT NOT NULL,
                            participant_id INT NOT NULL,
                            status ENUM('pending', 'confirmed', 'cancelled') NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            FOREIGN KEY (event_id) REFERENCES events(id),
                            FOREIGN KEY (participant_id) REFERENCES participants(id)
                        );
                    `, (err) => {
                        if (err) return console.error("Error saat membuat tabel 'reservations': ", err);

                        // Tabel 'payments'
                        db.execute(`
                            CREATE TABLE IF NOT EXISTS payments (
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                reservation_id INT NOT NULL,
                                amount DECIMAL(10, 2) NOT NULL,
                                status ENUM('paid', 'unpaid') NOT NULL,
                                payment_date DATE,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                FOREIGN KEY (reservation_id) REFERENCES reservations(id)
                            );
                        `, (err) => {
                            if (err) return console.error("Error saat membuat tabel 'payments': ", err);

                            // Tabel 'sessions'
                            db.execute(`
                                CREATE TABLE IF NOT EXISTS sessions (
                                    id INT PRIMARY KEY AUTO_INCREMENT,
                                    event_id INT NOT NULL,
                                    name VARCHAR(100) NOT NULL,
                                    start_time TIME NOT NULL,
                                    end_time TIME NOT NULL,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                    FOREIGN KEY (event_id) REFERENCES events(id)
                                );
                            `, (err) => {
                                if (err) return console.error("Error saat membuat tabel 'sessions': ", err);

                                // Tabel 'validators'
                                db.execute(`
                                    CREATE TABLE IF NOT EXISTS validators (
                                        id INT PRIMARY KEY AUTO_INCREMENT,
                                        user_id INT NOT NULL,
                                        validator_key VARCHAR(100) NOT NULL,
                                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                        FOREIGN KEY (user_id) REFERENCES users(id)
                                    );
                                `, (err) => {
                                    if (err) return console.error("Error saat membuat tabel 'validators': ", err);

                                    // Tabel 'scanned'
                                    db.execute(`
                                        CREATE TABLE IF NOT EXISTS scanned (
                                            id INT PRIMARY KEY AUTO_INCREMENT,
                                            session_id INT NOT NULL,
                                            participant_id INT NOT NULL,
                                            scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                            FOREIGN KEY (session_id) REFERENCES sessions(id),
                                            FOREIGN KEY (participant_id) REFERENCES participants(id)
                                        );
                                    `, (err) => {
                                        if (err) return console.error("Error saat membuat tabel 'scanned': ", err);
                                        console.log("Semua tabel berhasil dibuat atau sudah ada.");
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

module.exports = initializeDatabase;