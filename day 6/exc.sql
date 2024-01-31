-- Find country name with most population from table country

use world;

select * from country order by population desc limit 1;
-- select Name, max(population) from country group by name;

-- Find the second one country with most population from table country
select * from country order by population desc limit 1 offset 1;


-- Find country name with lowest population from table country
select * from country order by population  limit 1;


-- Find the third one country with lowest population from table country
select * from country where population > 0 order by population  limit 1 offset 1;
select * from country order by population;

-- Find the largest continent by sum surface area with life expectancy more than 75
select sum(surfaceArea) as sum_surface, continent from country where lifeExpectancy > 75 group by continent order by sum_surface desc limit 1 ;
