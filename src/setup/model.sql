create table users (
  user_id serial not null primary key,
  user_name varchar(100) not null,
  user_email varchar(100) not null,
  user_message text not null
);