import jinja2
import markdown
import codecs

templateLoader = jinja2.FileSystemLoader(searchpath=".")
templateEnv = jinja2.Environment(loader=templateLoader)

TEMPLATE_FILE = "template-index.html"
template = templateEnv.get_template(TEMPLATE_FILE)

globals()['templateVariables'] = {}
execfile('contents/main.py')

outputText = template.render(globals()['templateVariables'])
#print(outputText)

output_file = open('index.html', 'wr+')
output_file.write(outputText.encode('utf8'))
output_file.close()

