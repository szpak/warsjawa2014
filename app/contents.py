# -*- coding: utf-8 -*-

from __future__ import division
from math import ceil
import os
import yaml
import random


def update_variables(variables):
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


    sponsors = yaml.load(open(os.path.dirname(os.path.abspath(__file__)) + '/contents/sponsors.yaml', 'r'))['sponsors']
    speakers = yaml.load(open(os.path.dirname(os.path.abspath(__file__)) + '/contents/speakers.yaml', 'r'))['speakers']
    partners = yaml.load(open(os.path.dirname(os.path.abspath(__file__)) + '/contents/partners.yaml', 'r'))['partners']
    variables.update({
        'page_title': 'Warsjawa: 100% workshop formula',
        'page_description': 'Conference for developers, by developers. Unique 100% workshop formula. “Learn by doing” approach. Proudly host workshops related to all aspects of software development: designing, developing, testing, maintaining etc. Initially oriented around Java and JVM programming languages. Now open to other programming languages like Scala, Groovy, Python, mobile development for Android, iOS and others.',
        'speakers': speakers,
        'speaker_placeholders': cell_placeholders(speakers,
                                                  number_of_cells_in_small_resolution=2,
                                                  number_of_cells_in_medium_resolution=5,
                                                  number_of_cells_in_large_resolution=9),
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
    variables.update(yaml.load(open(os.path.dirname(os.path.abspath(__file__)) + '/contents/workshops.yaml', 'r')))

    id = 0
    for track_number in range(0, 18):
        number_of_time_slots = 5
        last_number_slot = 0
        while last_number_slot < number_of_time_slots:
            length = 1
            time_slots_string = '[time_slot_{0}]'.format(last_number_slot)
            if random.random() > 0.8 and last_number_slot + 2 < number_of_time_slots:
                length = 2
                time_slots_string = '[time_slot_{0}, time_slot_{1}]'.format(last_number_slot, last_number_slot + 1)

            print """
    - id: workshop_{id}
      name: Workshop {id}
      time_slots: {time_slots}
      speaker: Venkat Subramaniam {id}
      description: Workshop {id} description
      maximum_number_of_attendees: {no_attendees}
      tags: [groovy, jvm]

            """.format(id=id, track_number=track_number, time_slots=time_slots_string,
                       no_attendees=random.randint(1, 5))
            id += 1
            last_number_slot+=1


