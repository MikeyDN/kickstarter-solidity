const routes = require('next-routes')();


routes
	.add('/campaigns/new', '/campaigns/new')
	.add('/campaigns/:address', '/campaigns/show'); // Colon says that next expressions is a variable


module.exports = routes;
