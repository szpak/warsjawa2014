# -*- coding: utf-8 -*-

from __future__ import division
from math import ceil
import os
import yaml


def update_variables(variables):
    sponsors = [
        {
            'name': 'Touk',
            'picture_url': 'images/sponsors/touk-320x320.png',
            'url': 'http://touk.pl/'
        },
        {
            'name': 'Pragmatists',
            'picture_url': 'images/sponsors/pragmatists-320x320.png',
            'url': 'http://pragmatists.pl/'
        },
        {
            'name': '4 Finance',
            'picture_url': 'images/sponsors/4-finance-320x320.png',
            'url': 'http://www.4finance.com/'
        },
        {
            'name': 'Typesafe',
            'picture_url': 'images/sponsors/typesafe-320x320.png',
            'url': 'https://typesafe.com/'
        },
        {
            'name': 'Mobica',
            'picture_url': 'images/sponsors/mobica-320x320.png',
            'url': 'http://www.mobica.com/'
        },
        {
            'name': 'Sii',
            'picture_url': 'images/sponsors/sii-320x320.png',
            'url': 'http://pl.sii.eu/'
        },
    ]

    def cell_placeholders(content_list,
                          minimum_number_of_rows=2,
                          number_of_cells_in_small_resolution=2,
                          number_of_cells_in_medium_resolution=4,
                          number_of_cells_in_large_resolution=7):
        number_of_speakers = len(content_list)

        placeholder_image_urls = [
            'images/speaker-placeholer-1-320x320.png',
            'images/speaker-placeholer-2-320x320.png',
            'images/speaker-placeholer-3-320x320.png',
        ]

        placeholders = []

        number_of_large_placeholders = get_number_of_placeholders(minimum_number_of_rows,
                                                                  number_of_cells_in_large_resolution,
                                                                  number_of_speakers)
        number_of_medium_placeholders = get_number_of_placeholders(minimum_number_of_rows,
                                                                   number_of_cells_in_medium_resolution,
                                                                   number_of_speakers)
        number_of_small_placeholders = get_number_of_placeholders(minimum_number_of_rows,
                                                                  number_of_cells_in_small_resolution,
                                                                  number_of_speakers)
        maximum_number_of_placeholders = max(number_of_large_placeholders,
                                             number_of_medium_placeholders,
                                             number_of_small_placeholders)

        for i in range(maximum_number_of_placeholders):
            placeholders.append({
                'placeholder_background_image_url': placeholder_image_urls[i % len(placeholder_image_urls)],
            })

        for i in range(number_of_large_placeholders):
            placeholders[i]['show_for_large'] = True

        for i in range(number_of_medium_placeholders):
            placeholders[i]['show_for_medium'] = True

        for i in range(number_of_small_placeholders):
            placeholders[i]['show_for_small'] = True

        return placeholders


    def get_number_of_placeholders(minimum_number_of_rows, number_of_cells_in_row, number_of_actual_cells):
        number_of_rows = max(minimum_number_of_rows, int(ceil(number_of_actual_cells / number_of_cells_in_row)))
        return number_of_rows * number_of_cells_in_row - number_of_actual_cells


    speakers = yaml.load(open(os.path.dirname(os.path.abspath(__file__)) + '/contents/speakers.yaml', 'r'))['speakers']
    partners = yaml.load(open(os.path.dirname(os.path.abspath(__file__)) + '/contents/partners.yaml', 'r'))['partners']
    variables.update({
        'page_title': 'Warsjawa: 100% workshop formula',
        'page_description': 'Conference for developers, by developers. Unique 100% workshop formula. “Learn by doing” approach. Proudly host workshops related to all aspects of software development: designing, developing, testing, maintaining etc. Initially oriented around Java and JVM programming languages. Now open to other programming languages like Scala, Groovy, Python, mobile development for Android, iOS and others.',
        'speakers': speakers,
        'speaker_placeholders': cell_placeholders(speakers),
        'sponsors': sponsors,
        'sponsor_placeholders': cell_placeholders(sponsors, minimum_number_of_rows=1),
        'partners': partners,
        'partner_placeholders': cell_placeholders(partners,
                                                  minimum_number_of_rows=1,
                                                  number_of_cells_in_small_resolution=4,
                                                  number_of_cells_in_medium_resolution=6,
                                                  number_of_cells_in_large_resolution=8),
    })
    variables.update(yaml.load(open(os.path.dirname(os.path.abspath(__file__)) + '/contents/organizers.yaml', 'r')))

