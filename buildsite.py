# -*- coding: utf-8 -*-

import jinja2
import sys

reload(sys)
sys.setdefaultencoding("utf-8")

templateLoader = jinja2.FileSystemLoader(searchpath=".")
templateEnv = jinja2.Environment(loader=templateLoader)

globals()['templateVariables'] = {}
execfile('contents/main.py')

template_files = [
    {
        'template_file': 'template-index.html',
        'output_file': 'index.html'
    },
    {
        'template_file': 'template-call-for-papers.html',
        'output_file': 'call-for-papers.html'
    },
    {
        'template_file': 'template-thank-you-for-filling-call-for-papers-form.html',
        'output_file': 'thank-you-for-filling-call-for-papers-form.html'
    },
]

for template_file in template_files:
    template = templateEnv.get_template(template_file['template_file'])
    outputText = template.render(globals()['templateVariables'])
    output_file = open(template_file['output_file'], 'wr+')
    output_file.write(outputText.encode('utf8'))
    output_file.close()

