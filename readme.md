**Efficiency App**

This project is a simple Node.js Express site with a few angular tweaks for responsive scrolling/sliding information.  
Currently, the code is setup to run as a normal express/node application in AWS Beanstalk, with a MySQL data source also 
hosted at AWS in AWS RDS.


**Dependencies**
- mysql (**npm install mysql**)
- properties-parser (**npm-install properties-parser**)


**Configuration**
This app uses MySQL, which needs the following properties in a file called
mysql.properties

host     = \<your mysql host>

user     = \<your mysql db user name>

password = \<your mysql db password>

database = \<your mysql database>