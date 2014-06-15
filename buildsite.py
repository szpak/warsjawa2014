#-*- coding: utf-8 -*-

import jinja2
import sys

reload(sys)
sys.setdefaultencoding("utf-8")

templateLoader = jinja2.FileSystemLoader(searchpath=".")
templateEnv = jinja2.Environment(loader=templateLoader)

TEMPLATE_FILE = "template-index.html"
template = templateEnv.get_template(TEMPLATE_FILE)

globals()['templateVariables'] = {}
execfile('contents/main.py')

outputText = template.render(globals()['templateVariables'])

output_file = open('index.html', 'wr+')
output_file.write(outputText.encode('utf8'))
output_file.close()

