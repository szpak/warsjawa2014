# -*- coding: utf-8 -*-

from __future__ import division
from math import ceil


def update_variables(variables):
    speakers = [
        {
            'name': 'Venkat Subramaniam',
            'picture_url': 'images/speakers/venkat-subramaniam-320x320.jpg'
        },
        {
            'name': 'Konrad Malawski',
            'picture_url': 'images/speakers/konrad-malawski-320x320.jpg'
        },
        {
            'name': 'Adam Smolnik',
            'picture_url': 'images/speakers/adam-smolnik-320x320.jpg'
        },
        {
            'name': 'Artur Stępniewski',
            'picture_url': 'images/speakers/artur-stepniewski-320x320.jpg'
        },
        {
            'name': 'Tomasz Nurkiewicz',
            'picture_url': 'images/speakers/tomek-nurkiewicz-320x320.jpg'
        },
        {
            'name': 'Jacek Kunicki',
            'picture_url': 'images/speakers/jacek-kunicki-320x320.jpg'
        },
        {
            'name': 'Maciej Górski',
            'picture_url': 'images/speakers/maciej-gorski-320x320.jpg'
        },
        {
            'name': 'Łukasz Sowa',
            'picture_url': 'images/speakers/lukasz-sowa-320x320.jpg'
        },
        {
            'name': 'Andrzej Michałowski',
            'picture_url': 'images/speakers/andrzej-michalowski-320x320.jpg'
        },
        {
            'name': 'Jacek Głodek',
            'picture_url': 'images/speakers/jacek-glodek-320x320.jpg'
        },
        {
            'name': 'Marek Będkowski',
            'picture_url': 'images/speakers/marek-bedkowski-320x320.jpg'
        },
        {
            'name': 'Sylwester Madej',
            'picture_url': 'images/speakers/sylwester-madej-320x320.jpg'
        },
        {
            'name': 'Michał Lipski',
            'picture_url': 'images/speakers/michal-lipski-320x320.jpg'
        },
        {
            'name': 'Tomasz Grynfelder',
            'picture_url': 'images/speakers/tomasz-grynfelder-320x320.jpg'
        },

    ]

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
        }
    ]

    partners = [
        {
            'picture_url': 'images/partners/bitspiration-320x320.png',
            'url': 'http://bitspiration.com/'
        },
        {
            'picture_url': 'images/partners/torun-jug-320x320.png',
            'url': 'http://torun.jug.pl/'
        },
        {
            'picture_url': 'images/partners/programista-320x320.png',
            'url': 'http://programistamag.pl/'
        }

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


    variables.update({
        'page_title': 'Warsjawa: 100% workshop formula',
        'page_description': 'Conference for developers, by developers. Unique 100% workshop formula. “Learn by doing” approach. Proudly host workshops related to all aspects of software development: designing, developing, testing, maintaining etc. Initially oriented around Java and JVM programming languages. Now open to other programming languages like Scala, Groovy, Python, mobile development for Android, iOS and others.',
        'speakers': speakers,
        'speaker_placeholders': cell_placeholders(speakers),
        'sponsors': sponsors,
        'sponsor_placeholders': cell_placeholders(sponsors),
        'partners': partners,
        'partner_placeholders': cell_placeholders(partners,
                                                  minimum_number_of_rows=1,
                                                  number_of_cells_in_small_resolution=4,
                                                  number_of_cells_in_medium_resolution=6,
                                                  number_of_cells_in_large_resolution=8)
    })

