use sakila;

-- Display the first and last names of all actors from the table actor.
select first_name,last_name from actor;

-- You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
select actor_id,first_name,last_name from actor where first_name = 'joe';

-- Display the address, district, and city_id from address only for district: California, Alberta and Mekka
select address,district,city_id from address where district in ('California', 'Alberta' , 'Mekka');
select address,district,city_id from address where district = 'California' or district = 'Alberta' or district = 'Mekka';

-- Count actor with last name WOOD from table actors.
select count(actor_id) from actor where last_name like '%wood%';
select count(actor_id) from actor where last_name = 'wood';


-- Shows list of customer_id and sum of amount spent that made payment more than 20.
select customer_id , sum(amount) sum from payment  group by customer_id having sum > 20;


select * from payment;
