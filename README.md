# Welcome to World Feed!

Hi! This is a desktop website that features a scrollable, clickable Google Map. This app works as a live Twitter Feed for the globe. Click on any location on the map, and you will be greeted with the top tweets from that location right now! 

This website is [hosted here.](https://acesadaf.github.io/World-Feed/)

## World Feed in Action

![alt text](https://github.com/acesadaf/World-Feed/blob/master/src/Images/demo.gif)

## APIs

1. Google Maps API: Provides the Google Map to React
2. Twitter API: Provides the Tweets to the backend server (Django). 

## Granularity

This app currently offers two levels of granularity on the map:
#### State Level:
If you click on a part of the map, it will return the top tweets from the US state (or its rough equivalent for other countries) on which the point you have clicked resides

#### Country Level:
Clicking on the map will return the top tweets from the country in which the point resides

## Caching
This React app utilizes a Django backend connected to a PostgreSQL database. The purpose of this database is to cache tweets temporarily in order to reduce the number of calls to the Twitter API. This assumes that some users will click on the same locations within a short span of time, and therefore several calls to the external API would be wasteful. 
However, this runs the risk of the tweets becoming stale. To prevent this, we do the following:
1) All tweets are cached along with the time at which the caching occurs
2) The backend uses a scheduler (using the APScheduler library for Python) to check every cached tweet in the database every 5 minutes
3) During this check, any tweet that was cached more than 12 hours ago gets removed.

In this way, we ensure that no tweets are particularly old, and maintain the spirit of a "live" feed.


