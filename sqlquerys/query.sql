CREATE DATABASE college_chan;

USE college_chan;

CREATE TABLE activity (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Ip_address VARCHAR(39) NOT NULL,
    log_data VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE moderators (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'moderator', 'super_moderator') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active'
);

CREATE TABLE boards (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'active',
    moderator_id INT,
    FOREIGN KEY (moderator_id) REFERENCES moderators(id) ON DELETE SET NULL
);

CREATE TABLE threads (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    board_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    ip_address VARCHAR(39) NOT NULL,
    image_path VARCHAR(255) DEFAULT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'closed', 'archived') DEFAULT 'active',
    views INT DEFAULT 0,
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

CREATE TABLE replies (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    thread_id INT NOT NULL,
    ip_address VARCHAR(39) NOT NULL,
    content TEXT NOT NULL,
    image_path VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'deleted') DEFAULT 'active',
    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE
);

-- Optional: Add indexes for performance
CREATE INDEX idx_ip_address ON activity(Ip_address);
CREATE INDEX idx_thread_id ON replies(thread_id);
CREATE INDEX idx_board_id ON threads(board_id);

INSERT INTO threads (board_id, title, ip_address, image_path, content) VALUES
(1, 'Top 10 Memes of 2024', '192.168.1.1', '/image1.png', 'What are your favorite memes from this year? Let\'s compile a list!'),
(1, 'Meme Challenge: Create a Meme of Yourself', '192.168.1.2','/image2.png', 'Post your best meme featuring yourself!'),
(1, 'Rate My Meme', '192.168.1.3', '/image3.png', 'Here\'s a meme I made. Let me know what you think!'),

(2, 'What if time travel was real?', '192.168.1.4', '/image4.png', 'What would you do if you could travel back in time?'),
(2, 'Thoughts on the meaning of life?', '192.168.1.5', '/image5.png', 'I\'ve been pondering this a lot lately. What do you all think?'),
(2, 'Is pineapple on pizza acceptable?', '192.168.1.6', '/image6.png', 'Let\'s settle this debate once and for all!')




-- Replies for Thread 1: "Top 10 Memes of 2024"
INSERT INTO replies (thread_id, ip_address, content, image_path, status) 
VALUES 
(1, '192.168.1.10', 'I love the meme about the AI taking over the world. Hilarious!', '/reply1_image.png', 'active'),
(1, '192.168.1.11', 'That "doge 2.0" meme was the best!', NULL, 'active');

-- Replies for Thread 2: "Meme Challenge: Create a Meme of Yourself"
INSERT INTO replies (thread_id, ip_address, content, image_path, status) 
VALUES 
(2, '192.168.1.12', 'Check out this meme of myself! 😂', '/reply2_image.png', 'active'),
(2, '192.168.1.13', 'This is how I feel on Mondays! *facepalm*', NULL, 'active');

-- Replies for Thread 3: "Rate My Meme"
INSERT INTO replies (thread_id, ip_address, content, image_path, status) 
VALUES 
(3, '192.168.1.14', 'I rate this meme 9/10! Could have been funnier.', '/image6.png', 'active'),
(3, '192.168.1.15', 'It’s pretty good, but maybe a funnier caption would make it 10/10!', '/image5.png', 'active');

-- Replies for Thread 4: "What if time travel was real?"
INSERT INTO replies (thread_id, ip_address, content, image_path, status) 
VALUES 
(4, '192.168.1.16', 'I’d go back and invest in Bitcoin early!', '/image4.png', 'active'),
(4, '192.168.1.17', 'I would love to meet ancient philosophers like Socrates.', '/image2.png', 'active');

-- Replies for Thread 5: "Thoughts on the meaning of life?"
INSERT INTO replies (thread_id, ip_address, content, image_path, status) 
VALUES 
(5, '192.168.1.18', 'I think life’s meaning is to create and share experiences.', '/image3.png', 'active'),
(5, '192.168.1.19', 'It’s all about finding happiness and helping others find theirs.', '/image3.png', 'active');

-- Replies for Thread 6: "Is pineapple on pizza acceptable?"
INSERT INTO replies (thread_id, ip_address, content, image_path, status) 
VALUES 
(6, '192.168.1.20', 'Pineapple on pizza is the ultimate combo! Don’t @ me.', '/image3.png', 'active'),
(6, '192.168.1.21', 'No way! Pineapple does not belong on pizza!', '/image3.png', 'active');
