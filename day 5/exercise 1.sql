-- Create db name as purwadhika_student, purwadhika_schedule, purwadhika_branch
create database purwadhika_student;
create database purwadhika_schedule;
create database purwadhika_branch;

-- Show list of database with name contain purwadhika.
show databases like '%purwadhika%';

-- Delete database purwadhika_schedule
drop database purwadhika_schedule;

-- create,drop,alter,show -- schema/database/table

-- insert,delete,update,select -- data

-- Create table name as Students in purwadhika_student db, with field id, last_name, first_name, address, city. The id field should be in integer type while the rest is varchar.
use purwadhika_student;
create table Students (id int not null auto_increment primary key,
last_name varchar(30)
,first_name varchar(30)
,address varchar(30),
city varchar(30));


-- Add email column into table Students with type varchar.
alter table students add email varchar(30);

-- Add gender, batch_code, phone_number, alternative_phone_number column in single query.
alter table students add gender enum('male','female'),add batch_code varchar(30), add phone_number varchar(30),add alternative_phone_number varchar(30);

-- Change alternative_phone_number column name into description with varchar type.
alter table students rename column alternative_phone_number to description;


-- Remove column gender in table Students
alter table students drop column gender;





select * from students;

use purwadhika_branch;

create table Branches 
(id int not null auto_increment primary key,
branch_name varchar(30),
pic varchar(30),
address varchar(30),
city varchar(30),
province varchar(30));

select * from branches;
insert into branches (branch_name,pic,address,city,province) values
('BSD','THOMAS','GREEN OFFICE PARK 9' , 'BSD','TANGERANG'),
('JKT','BUDI','MSIG TOWER' , 'JAKARTA SELATAN','JAKARTA'),
('BTM','ANGEL','NONGSA' , 'BATAM','KEP. RIAU');

set sql_safe_updates = 0;

update  branches set pic = 'DONO' where city = 'BSD';
insert into branches (branch_name,pic,address,city,province) 
values ('BLI',  'Tono',  'Gianyar', 'Gianyar', 'Bali');

