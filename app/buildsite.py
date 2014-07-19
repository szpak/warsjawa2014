# -*- coding: utf-8 -*-

import jinja2
import sys
import os
import shutil
import contents


absolute_path = os.path.dirname(os.path.abspath(__file__))

reload(sys)
sys.setdefaultencoding("utf-8")

absolute_template_path = absolute_path + '/templates'
absolute_output_path = absolute_path + '/output'

print(' ++++ compiling sass...')
os.system('compass compile /warsjawa/app/')

print(' ++++ compiling templates...')
globals()['templateVariables'] = {}
contents.update_variables(globals()['templateVariables'])

template_files = [
    'index.html',
    'call-for-papers.html',
    'thank-you-for-filling-call-for-papers-form.html',
]

loader = jinja2.FileSystemLoader(searchpath=absolute_template_path)
template_environment = jinja2.Environment(loader=loader)

for template_file in template_files:
    template = template_environment.get_template(template_file)
    outputText = template.render(globals()['templateVariables'])
    output_file = open(absolute_output_path + '/' + template_file, 'wr+')
    output_file.write(outputText.encode('utf8'))
    output_file.close()

print(' ++++ copying static to output')
os.system('cp -rf %s %s' % (absolute_path + '/static/*', absolute_output_path))


print (' ============================================= ')
print (os.system('ls -a /warsjawa/app'))
print (' ============================================= ')
print (os.system('ls -a /warsjawa/app/output'))
