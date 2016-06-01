# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
first           | string    |
last            | string    |
avatar_url      | string    |
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
confirmed       | boolean   | not null, indexed

## teams

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## team_memberships

column name     | data type | details
----------------|-----------|-----------------------
user_id         | integer   | not null, indexed, references: users(id)
workspace_id    | integer   | not null, indexed, references: teams(id)
permissions     | integer   | not null

## projects

column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
title        | string    | not null
description  | text      |
team_id | integer        | not null, references: teams(id)

## tasks

column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
title        | string    | not null
description  | text      |
workspace_id | integer   | not null, indexed, references: teams(id)
project_id   | integer   | indexed, references: projects(id)
asignee_id   | integer   | references: users(id)
due_date     | datetime  |
completed    | boolean   | default: false
order        | integer   | not null

## comments

column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
task_id      | integer   | not null, indexed, references: tasks(id)
author_id    | integer   | not null, references: users(id)
content      | text      | not null
