-- Drop tables if they exist
DROP TABLE IF EXISTS Student CASCADE; 
DROP TABLE IF EXISTS Candidate CASCADE;
DROP TABLE IF EXISTS Form CASCADE;
DROP TABLE IF EXISTS Election CASCADE;
DROP TABLE IF EXISTS ElectionResult CASCADE;
DROP TABLE IF EXISTS Vote CASCADE;
DROP TABLE IF EXISTS Faculty CASCADE;
DROP TABLE IF EXISTS Notification CASCADE;
DROP TABLE IF EXISTS Department CASCADE;

-- Faculty Table
CREATE TABLE Faculty (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Department Table
CREATE TABLE Department (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    faculty_id INTEGER REFERENCES Faculty(id) NOT NULL
);
-- Student Table
CREATE TABLE Student (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    department_id INTEGER REFERENCES Department(id),
    role TEXT,
    tenure DATE
);

-- Candidate Table
CREATE TABLE Candidate (
    id SERIAL PRIMARY KEY,
    correction boolean DEFAULT false,
    status TEXT NOT NULL,
    student_id INTEGER REFERENCES Student(id) NOT NULL,
    election_id INTEGER REFERENCES Election(id) NOT NULL ON DELETE CASCADE,
    comment TEXT 
);

-- Form Table
CREATE TABLE Form (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES Candidate(id) NOT NULL ON DELETE CASCADE,
    file_data BYTEA,
    file_name TEXT,
    mime_type TEXT,
    file_size INTEGER
);

-- Election Table
CREATE TABLE Election (
    id SERIAL PRIMARY KEY,
    start_time DATE NOT NULL,
    end_time DATE NOT NULL,
    round INTEGER NOT NULL,
    department_id INTEGER UNIQUE REFERENCES Department(id)
);

-- Election Result Table
CREATE TABLE ElectionResult (
    id SERIAL PRIMARY KEY,
    department_id INTEGER REFERENCES Department(id) NOT NULL UNIQUE,
    winner_student_id INTEGER[],
    vote_count INTEGER
);

-- Vote Table (Joint)
CREATE TABLE Vote (
	student_id INTEGER REFERENCES Student(id),
	election_id INTEGER REFERENCES Election(id) ON DELETE CASCADE,
    candidate_id INTEGER REFERENCES Candidate(id) ON DELETE CASCADE,
	PRIMARY KEY(Student_id, election_id)
);