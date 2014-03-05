{% for module in modules -%}var {{camelCased(module)}} = require('{{module}}');
{% endfor %}
{% for task in tasks-%}
gulp.task('{{task.name}}'{% if task.tasks.length %}, [{% for task in task.tasks %}'{{task}}'{% endfor %}]{% endif %}{% if task.streams.length %}, function () {
  gulp
    {% for stream in task.streams %}{% if !loop.last %}{{renderPlugin(stream)}}
    {% else %}{{renderPlugin(stream)}};{% endif %}{% endfor %}
}{% endif %});
{%- if !loop.last %}

{% endif -%}
{% endfor %}
