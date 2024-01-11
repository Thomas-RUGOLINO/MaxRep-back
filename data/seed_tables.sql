-- Insert false data in table "category"
INSERT INTO "category" ("name")
VALUES 
('Fitness'),
('Wellness'),
('Endurance');

-- Insert false data in table "user"
INSERT INTO "user" ("email", "password", "firstname", "lastname", "birth_date", "city", "country", "gender", "weight", "height", "is_shared", "profile_picture")
VALUES 
('user1@example.com', 'password1', 'John', 'Doe', '1990-01-01', 'Paris', 'France', 'male', 70, 175, false, ''),
('user2@example.com', 'password2', 'Jane', 'Smith', '1985-05-05', 'Lyon', 'France', 'female', 65, 165, true, ''),
('user3@example.com', 'password3', 'Jim', 'Brown', '1992-02-02', 'Marseille', 'France', 'male', 80, 180, false, '');

-- Insert false data in table "sport"
INSERT INTO "sport" ("name", "unit", "category_id")
VALUES 
('Running', 'km', 1),
('Swimming', 'meters', 2),
('Cycling', 'km', 3);

-- Insert false data in table "user_has_sport"
INSERT INTO "user_has_sport" ("user_id", "sport_id")
VALUES 
(1, 1),
(2, 2),
(3, 3);

-- Insert false data in table "best_performance"
INSERT INTO "best_performance" ("best_score", "date", "user_id", "sport_id")
VALUES 
(10.5, '2024-01-01', 1, 1),
(50.0, '2024-01-02', 2, 2),
(20.5, '2024-01-03', 3, 3);

-- Insert false data in table "session"
INSERT INTO "session" ("date", "description", "user_id", "sport_id")
VALUES 
('2024-01-04', 'Morning Run', 1, 1),
('2024-01-05', 'Pool Swim', 2, 2),
('2024-01-06', 'Evening Ride', 3, 3);
