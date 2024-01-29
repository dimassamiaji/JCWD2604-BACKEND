use sakila;

-- Add new actor into table actors with name JHONNY DAVIS.

select * from actor;
insert into actor (first_name,last_name) values('JHONNY','DAVIS');


-- There are several new actor to add. Add new actor into table actors with name ADAM DAVIS, JEREMY DAVIS, CRAIG DAVIS, STEVE DAVIS in a single query.
insert into actor (first_name,last_name) values('ADAM','DAVIS'), ('JEREMY','DAVIS'),('CRAIG','DAVIS'),('STEVE','DAVIS');

-- Count how many actors with last name DAVIS.
select count(actor_id) from actor where last_name = 'DAVIS';

-- Delete actor with last name DAVIS and first name JENNIFER.
delete from actor where first_name = 'jennifer' and last_name = 'davis';

-- Update actor with last name DAVIS and change his/her first name into GEORGE
update actor set first_name = 'George' where last_name = 'davis';

-- Find top 10 actor with the most perform on film.

select * from film_actor;
select actor_id,count(film_id) count 
from film_actor group by actor_id order by count(film_id) desc limit 10;

-- Display title, description, length, and rating from film, where special features include deleted scenes and behind the scenes order by most length
select  count(rating) from film;

select  title, description, length,  rating , special_features
from film 
-- where special_features like '%Deleted Scenes,Behind the Scenes%' 
where special_features like '%Deleted Scenes%' and special_features like '%Behind the Scene%'

order by length desc;

-- Display country and total of inactive customer (active = 0) from country where customer active = 0 order by the highest inactive (active = 0) customer

select * from payment;
select * from customer;

select  c.first_name,c.last_name, p.amount, p.payment_date from payment p 
join customer c on c.customer_id = p.customer_id and c.first_name = 'KAREN'
where p.amount > 3
order by p.amount desc;

-- Display country and total of inactive customer (active = 0) 
-- from country where customer active = 0 
-- order by the highest inactive (active = 0) customer

select * from customer;
select * from address;
select * from city;
select * from country;

select c.country ,count(csm.active) inactive_customer from customer csm 
join address a on a.address_id  = csm.address_id
join city ct on ct.city_id = a.city_id
join country c on c.country_id = ct.country_id 
where csm.active = 0
group by c.country
order by inactive_customer desc;

-- left join, right join, union, indexing, relational db, subquery 

select first_name from customer where first_name = 'udin'
union 
select 'ikmal' as first_name;

select * from actor a
 join film_actor fa on fa.actor_id = a.actor_id;

insert into actor (first_name,last_name) values ('udin','uzumaki');

select * from actor where first_name = 'udin';

select * from film_actor fa 
right join actor a on a.actor_id = fa.actor_id
where a.first_name = 'udin'
union
select * from actor a
left join film_actor fa on fa.actor_id = a.actor_id
where a.first_name = 'udin';


select 'udin' as name 
union all
select 'udin' as name ;
 
--  
-- one to many : 
-- - id,no_invoice, payment_date, total_transaction : order
-- -  orderid,productid,price,qty  				 : orderDetail

select * from country;
select * from city;

select country, city from country c 
join city ct on ct.country_id = c.country_id order by country;

-- many to many :
-- 1 film punya banyak actor 
-- 1 actor bisa main banyak film 

select * from actor;
select * from film;
select * from film_actor;

select first_name,last_name, title,description from actor a
join film_actor fa on fa.actor_id = a.actor_id
join film f on f.film_id = fa.film_id 
order by title;

-- one to one 
-- table user dengan table display_picture 
-- table user dan display _picture memiliki id yang sama 

select sq.customer_id as c_id from (select customer_id from customer) sq;


select first_name,last_name,
(select amount,customer_id , 'ini group subquery' as g from payment where customer_id =  c.customer_id) as sum_amount
 from customer c;
 
 select first_name,last_name, sum(amount) from customer c 
 join payment p on p.customer_id = c.customer_id 
 group by first_name,last_name;
 
 select first_name,last_name, amount, g from customer c 
 join (select amount,customer_id , 'ini group subquery' as g from payment) sq on sq.customer_id = c.customer_id;
 
 
 select * from customer where customer_id in (
  select distinct customer_id from payment where amount > 2);
 
 -- biasanya diwajibkan return 1 kolom dan 1 baris saja 
 
 
 select * from actor;
 
 create index idx_first_name on actor (first_name);
 
 start transaction;
 delete from actor where first_name like '%a%';
 rollback;
 select * from actor;
 
 -- one to one 
 
--  transaction
--  berhasil = commit 
--  gagal = rollback
-- employeeAccount - bankaccount, bankNumber 
-- employeeData - firstname,lastname,address


 
 
 





select * from customer where active = 0;
select * from address;
select * from city;
select * from country;

select count(c.active) inactive_customer, c2.country from customer c
join address a on a.address_id = c.address_id
join city ct on ct.city_id = a.city_id
join country c2 on c2.country_id = ct.country_id
where c.active = 0
group by country 
order by inactive_customer desc;




 

