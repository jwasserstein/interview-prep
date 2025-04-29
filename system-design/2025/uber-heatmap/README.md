# Uber Heatmap
Thinking through some options for a system design problem I had from my Uber interview

## Problem
You need to build a system which can show Uber employees a heatmap of where Uber drivers have been.  The driver's mobile app will report its location periodically, and we need to build a system which can store that data and show it to users in the form of a geographical heatmap.  You need to store the last 20 minutes of data and make it available in 1 minute increments.


## Assumptions
- 10 million uber drivers
- 1000 uber employees
