var handlebars = require('handlebars'),
  fs = require('fs'),
  express = require('express'),
  app = express(),
	_ = require('underscore');
app.set('port', process.env.PORT || 3000);
class templates {
		getExampleData() {
				{
						var main = {},
								data = {
									  title: 'practical node.js',
									  author: '@azat_co',
									  tags: ['express', 'node', 'javascript']
								};
						data.body = process.argv[2];
						return new Promise((resolve, reject) => {
								fs.readFile('example.html', 'utf-8', (error, source) => {
										var template,
										    html;
									  handlebars.registerHelper('custom_title', function(title){
										    var words = title.split(' ');
										    for (var i = 0; i < words.length; i++) {
										      if (words[i].length > 4) {
										        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
										      }
										    }
										    title = words.join(' ');
										    return title;
									  });
									  template = handlebars.compile(source);
									  html = template(data);
									  main.body = html;
									  resolve(main);
								});
						});
				};
		}
		
		getHelperData() {
				{
						var obj = {content: 'hello'},
								main = {};
								
						return new Promise((resolve, reject) => {
								fs.readFile('helper.html', 'utf-8', (error, source) => {
										var template, html;
										    
								    handlebars.registerHelper('list', function(context, options) {
											  var out = "<ul>", data = {};
											  if (options.data) {
											    	data = handlebars.createFrame(options.data);
											  }
											  for (var i=0; i<context.length; i++) {
												    if (data) {
												      data.index = i;
												    }
												
												    out += "<li>" + options.fn(context[i], { data: data }) + "</li>";
											  }
											  out += "</ul>";
											  return out;
										});
										template = handlebars.compile(source);
										html = template({array:[{title: 'a'},{title: 'b'},{title: 'c'}]});
										main.body = html;
										resolve(main);
								});
						});
				}
		}
		
		getPartials_1Data() {
				{
						var context = {
							  author: {firstName: "Alan", lastName: "Johnson"},
							  body: "I Love Handlebars",
							  comments: [{
							    author: {firstName: "Yehuda", lastName: "Katz"},
							    body: "Me too!"
							  }]
						};
						return new Promise((resolve, reject) => {
								fs.readFile('partials/partials_1.html', 'utf-8', (error, source) => {
										resolve(source);
								});
						}).then((data) => {
								return new Promise((resolve, reject) => {
										var template, html;
										handlebars.registerPartial('userMessage', data);
										fs.readFile('partials.html', 'utf-8', (error, source) => {
												template = handlebars.compile(source);
												html = template(context);
												resolve({body: html});
										});
								})
						});
				}
		}
};

var t = new templates();
console.log(t);
var sendHtml = (req, res, data) => {
		fs.readFile('main.html', 'utf-8', (error, source) => {
					var template = handlebars.compile(source),
							html = template(data);
					res.type('text/html;charset=utf-8');
					res.send(html);
			});
};
app.get('/example', (req, res) => {
		t.getExampleData()
				.then((data) => sendHtml(req, res, data));
		
});


app.get('/helper', (req, res) => {
		t.getHelperData()
				.then((data) => sendHtml(req, res, data));
		
});

app.get('/partials/partials_1', (req, res) => {
		t.getPartials_1Data()
				.then((data) => sendHtml(req, res, data));
});

app.listen(app.get('port'), () => {
		console.log('start success');
});