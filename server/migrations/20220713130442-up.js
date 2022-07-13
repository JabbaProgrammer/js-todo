'use strict';

module.exports = {
  	up: (qi) => qi.sequelize.query(`
		CREATE TABLE users (
			id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
			created_at date not null default now(),
			updated_at date,
			email varchar not null,
			password varchar not null
		);
		CREATE TABLE tasks (
			id uuid primary key not null default gen_random_uuid(),
			created_at date not null default now(),
			updated_at date,
			name varchar not null,
			complete boolean not null default false,
			description varchar not null,
			user_id uuid references users(id) not null
		);
  	`),
  	down: (qi) => qi.sequelize.query(`
	  	DROP TABLE tasks;	
		DROP TABLE users;
  	`)
};
