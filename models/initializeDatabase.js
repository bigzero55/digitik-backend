const db = require("./db");

const initializeDatabase = () => {
  // Tabel 'users'
  db.execute(
    `
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `,
    (err) => {
      if (err) return console.error("Error saat membuat tabel 'users': ", err);

      // Tabel 'participants' dibuat setelah 'users' selesai
      db.execute(
        `
            CREATE TABLE IF NOT EXISTS participants (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                unix TEXT NOT NULL,
                phone VARCHAR(15) NOT NULL,
                email VARCHAR(100) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `,
        (err) => {
          if (err)
            return console.error(
              "Error saat membuat tabel 'participants': ",
              err
            );

          // Tabel 'participants_additional_info'
          db.execute(
            `
                CREATE TABLE IF NOT EXISTS participants_additional_info (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    participant_id INT NOT NULL,
                    key_info TEXT NOT NULL,
                    value_value TEXT,
                    FOREIGN KEY (participant_id) REFERENCES participants(id)
                );
            `,
            (err) => {
              if (err)
                return console.error(
                  "Error saat membuat tabel 'participants_additional_info': ",
                  err
                );

              // Tabel 'events'
              db.execute(
                `
                    CREATE TABLE IF NOT EXISTS events (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        user_id INT NOT NULL,
                        title VARCHAR(255) NOT NULL,
                        unix TEXT NOT NULL,
                        description TEXT,
                        date DATE NOT NULL,
                        price INT DEFAULT 0,
                        capacity INT NOT NULL,
                        location VARCHAR(255),
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(id)
                    );
                `,
                (err) => {
                  if (err)
                    return console.error(
                      "Error saat membuat tabel 'events': ",
                      err
                    );

                  // Tabel 'reservations'
                  db.execute(
                    `
                        CREATE TABLE IF NOT EXISTS reservations (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            user_id INT NOT NULL,
                            participant_id INT NOT NULL,
                            event_id INT NOT NULL,
                            status VARCHAR(20) NOT NULL,
                            booking_code VARCHAR(50) NOT NULL,
                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (user_id) REFERENCES users(id),
                            FOREIGN KEY (participant_id) REFERENCES participants(id),
                            FOREIGN KEY (event_id) REFERENCES events(id)
                        );
                    `,
                    (err) => {
                      if (err)
                        return console.error(
                          "Error saat membuat tabel 'reservations': ",
                          err
                        );

                      // Tabel 'payments'
                      db.execute(
                        `
                            CREATE TABLE IF NOT EXISTS payments (
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                user_id INT NOT NULL,
                                reservation_id INT NOT NULL,
                                payment_date DATETIME NOT NULL,
                                amount DECIMAL(10,2) NOT NULL,
                                status VARCHAR(20) NOT NULL,
                                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (user_id) REFERENCES users(id),
                                FOREIGN KEY (reservation_id) REFERENCES reservations(id)
                            );
                        `,
                        (err) => {
                          if (err)
                            return console.error(
                              "Error saat membuat tabel 'payments': ",
                              err
                            );

                          // Tabel 'sessions'
                          db.execute(
                            `
                                CREATE TABLE IF NOT EXISTS sessions (
                                    id INT PRIMARY KEY AUTO_INCREMENT,
                                    user_id INT NOT NULL,
                                    event_id INT NOT NULL,
                                    unix TEXT NOT NULL,
                                    name TEXT NOT NULL,
                                    description TEXT NOT NULL,
                                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                    FOREIGN KEY (user_id) REFERENCES users(id),
                                    FOREIGN KEY (event_id) REFERENCES events(id)
                                );
                            `,
                            (err) => {
                              if (err)
                                return console.error(
                                  "Error saat membuat tabel 'sessions': ",
                                  err
                                );

                              // Tabel 'validators'
                              db.execute(
                                `
                                    CREATE TABLE IF NOT EXISTS validators (
                                        id INT PRIMARY KEY AUTO_INCREMENT,
                                        user_id INT NOT NULL,
                                        name TEXT NOT NULL,
                                        FOREIGN KEY (user_id) REFERENCES users(id)
                                    );
                                `,
                                (err) => {
                                  if (err)
                                    return console.error(
                                      "Error saat membuat tabel 'validators': ",
                                      err
                                    );

                                  // Tabel 'scanned'
                                  db.execute(
                                    `
                                        CREATE TABLE IF NOT EXISTS scanned (
                                            id INT PRIMARY KEY AUTO_INCREMENT,
                                            scanTime DATETIME DEFAULT CURRENT_TIMESTAMP,
                                            participant_id INT NOT NULL,
                                            validator_id INT NOT NULL,
                                            session_id INT NOT NULL,
                                            FOREIGN KEY (participant_id) REFERENCES participants(id),
                                            FOREIGN KEY (validator_id) REFERENCES validators(id),
                                            FOREIGN KEY (session_id) REFERENCES sessions(id)
                                        );
                                    `,
                                    (err) => {
                                      if (err)
                                        return console.error(
                                          "Error saat membuat tabel 'scanned': ",
                                          err
                                        );
                                      console.log(
                                        "Semua tabel berhasil dibuat atau sudah ada."
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

module.exports = initializeDatabase;
