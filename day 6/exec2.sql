-- Show all data using IN, and display the country_id and country columns of the following countries: China, Bangladesh, and India
use sakila;
select * from country;
select country_id,country  from country where country in ('China','Bangladesh','India');
-- Find every actors whose last names contain the letters OD. 
-- Order the rows by last name and first name, in that order
select * from actor where last_name like '%od%' order by last_name and first_name;

-- Modify table actors. Add a middle_name column to the table actor. 
-- Position it between first_name and last_name. 
-- Hint: you will need to specify the data type.

alter table actor add column middle_name varchar(30) after first_name;

-- List every last names of actors and the number of actors who have that last name,
 -- but only for names that are shared by at least two actors


select last_name,count(last_name) count_name  from actor group by last_name having count_name >= 2;

-- Join the table and display the first and last names,
-- as well as the address, of each staff member.

select first_name,last_name,address from staff s
join address a on a.address_id = s.address_id ;


-- Find out how many copies of the film “Hunchback Impossible”
--  exist in the inventory system

select count(f.title) from inventory i
join film f on f.film_id = i.film_id
where f.title = 'Hunchback Impossible';

-- Find and display the most frequently rented movies in descending order.

select f.* from film f
join (
select f.film_id,count(f.film_id) count_rental from rental r
join inventory i on i.inventory_id = r.inventory_id
join film f on f.film_id = i.film_id
group by f.film_id
order by count_rental desc limit 1) sq on sq.film_id = f.film_id;


-- Write down a query in order to display each store its store ID, city, and country
select s.store_id, ct.city , c.country from store s
join address a on a.address_id = s.address_id
join city ct on ct.city_id = a.city_id
join country c on c.country_id = ct.country_id;


-- Use subqueries to display every actors who appear in the film Alone Trip.
select * from actor;
select * from film;
select * from film_actor;

select * from actor where actor_id in (
select fa.actor_id from film f 
join film_actor fa on fa.film_id = f.film_id
where f.title = 'Alone Trip');

select f.title, count(f.title) from film f 
join film_actor fa on fa.film_id = f.film_id
join actor a on a.actor_id = fa.actor_id
group by f.title;

select *, (select count(film_id) from film_actor fa 
join actor a on a.actor_id = fa.actor_id
where film_id = f.film_id
group by film_id) total_actor from film f;



select a.* from film f 
join film_actor fa on fa.film_id = f.film_id
join actor a on a.actor_id = fa.actor_id
where f.title = 'Alone Trip';

-- Delete the middle_name column from table actors

alter table actor drop column middle_name;