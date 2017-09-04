**Efficiency App**

This project is a simple Node.js Express site with a few angular tweaks for responsive scrolling/sliding information.  
A **_MySQL data source_** is used to house all the data used in the application.

The main functionality is to provide developers a way to select the tools they used that
helped save time/money. (Each tool has a corresponding hours-saved). Developers can select one to several tools on a page that uses
a multi-select box (customized with **_chosen.js_**), and upon submitting, the selected items 
will have a Mysql row of data created recording datetime, and tool (one row for each tool that was selected).

A seperate reporting page (which will use DC.j and D3.js) will present the information
in graphical charts, allowing drill-down by tool, dates, and enviroments.


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