var handlebars = require('handlebars'),
  fs = require('fs'),
  express = require('express'),
  app = express();

app.set('port', process.env.PORT || 3000);

let getExampleData() => {
		let main = {},
				data = {
					  title: 'practical node.js',
					  author: '@azat_co',
					  tags: ['express', 'node', 'javascript']
				};
				
		data.body = process.argv[2];
		fs.readFile('example.html', 'utf-8', (error, source) => {
				let template = handlebars.compile(source),
				    html = template(data),
	  				main.body = html;
			  handlebars.registerHelper('custom_title', function(title){
				    let words = title.split(' ');
				    for (var i = 0; i < words.length; i++) {
				      if (words[i].length > 4) {
				        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
				      }
				    }
				    title = words.join(' ');
				    return title;
			  });
			  return main;
		});
};

let getHelperData() => {
		let content = {content: 'hello'},
				main = {};
		fs.readFile('helper.html', 'utf-8', (error, source) => {
				let template = handlebars.compile(source),
				    html = template(content),
	  				main.body = html;
		    handlebars.registerHelper('bold', (options) => {
						return options.fn(this); 		
				});
		});
}

let sendHtml(req, res, data) => {
		fs.readFile('main.html', 'utf-8', (error, source) => {
					let template = handlebars.compile(source),
							html = template(data);
							
					res.type('text/html;charset=utf-8');
					res.send(html);
			});
};
app.get('/example', (req, res) => {
		sendHtml(req, res, getExampleData());
});


app.get('/helper', (req, res) => {
		sendHtml(req, res, getHelperData());
});

app.listen(app.get('port'), () => {
		console.log('start success');
});