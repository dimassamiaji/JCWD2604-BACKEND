CREATE DATABASE db_purwadhika; -- create database
create database db_contoh;

show databases; -- show all databases 
show create database db_purwadhika; -- log create database

use db_purwadhika; -- menggunakan database purwadhika

drop database db_contoh; -- hapus database db_contoh

create table students(name varchar(30) not null, marks Integer);

alter table students add address varchar(100) not null;
create table contoh(contoh varchar(255)); -- create table contoh
drop table contoh; -- hapus table contoh

alter table students rename column address to alamat;
select * from students;

insert into students(name,marks,alamat) values('ikmal', 100, 'jakarta'); 
insert into students(name,marks,alamat) values('ayesha', 90, 'cibubur'); 
insert into students(name,marks,alamat) values('hanief', 11, 'jakarta'); 
insert into students(name,marks,alamat) values('chairin', 80, 'bandung'); 


select * from students; -- select all columns in table students
select name from students; -- select column name in table students

update  students set alamat = 'jakarta',marks = 50  where name = 'ikmal';
update  students set alamat = 'cibubur' where name = 'ayesha';
-- update students set alamat = 'purwadhika'; update semua alamat di student menjadi purwadhika

select * from students;
select * from students where alamat = 'jakarta' and marks > 40;
select * from students where alamat = 'jakarta' or marks > 40;
select * from students where alamat = 'jakarta' or alamat = 'bandung';

select distinct alamat from students;
select count(name) total_student ,alamat from students group by alamat;
select avg(marks) as avg_marks_student, alamat from students group by alamat;

select * from students where name like '%a%'; -- nama diawali atau diakhiri dengan a
select * from students where name like '%ef'; -- nama diakhiri dengan ef
select * from students where name like 'ik%'; -- nama diawali dengan ik

select * from students order by name desc; -- sort students by name descending 
select * from students order by marks; -- sort students by marks ascending

select count(name) total,alamat from students group by alamat having total = 2;

select name,alamat,marks as nilai  from students where marks > 50 group by name,alamat,marks; -- 1000
select  name,alamat,marks  as nilai from students  group by name,alamat,marks having marks > 50; -- 1000

select * from students;
select * from students limit 2 offset 0; -- data students dari offset 0 sebanyak 2 data
select * from students limit 2 offset 2; -- data students dari offset 2 sebanyak 2 data

set sql_safe_updates = 0; -- disable safe_updates 

delete from students where name = 'ikmal'; -- menghapus data students yang namanya adalah ikmal

-- accessing table/database create,alter,drop,show
-- accessing data insert,update,delete, select

select name from students;
select count(name) jumlah_student from students;

update students set name = 'udin' where name = 'ikmal';


delete from students where name = 'udin';

select name from students where name = 'ikmal' group by name order by name;

select name from students having name = 'ikmal';

select * from students limit 2 offset 4 ;


CREATE TABLE Persons (
    Personid int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (Personid)
);

insert into Persons(LastName,FirstName, Age) values("uzumaki", "wowo" , 59);
insert into Persons(LastName,FirstName, Age) values("uchiha", "gibski" , 37);

select * from Persons;
