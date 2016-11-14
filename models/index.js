var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	//can be set to false after dev is over an SQL does not need to be logged out
	logging: true
});

var Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
	}
},
	{
  	getterMethods   : {
    route       : function()  { return '/wiki/' + this.getDataValue('urlTitle') }
	}		
});

Page.hook('beforeValidate', function(req) {

	var title = req.urlTitle.replace(/ /g, '_').replace(/\W/g, '');
	var newTitle = title ? title : 'title';

	req.urlTitle = newTitle;
})

var User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = {
	Page: Page,
	User: User
}