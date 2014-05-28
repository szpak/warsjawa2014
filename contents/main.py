from __future__ import division
from math import ceil

speakers = [
    {
        'name': 'Venkat Subramaniam',
        'picture_url': 'images/speakers/venkat-subramaniam-320x320.jpg'
    }
]

sponsors = [
    {
        'name': 'Touk',
        'picture_url': 'images/sponsors/touk-320x320.png'
    }
]


def cell_placeholders(speaker_list):
    number_of_speakers = len(speaker_list)
    minimum_number_of_rows = 2
    number_of_speakers_in_small_resolution = 2
    number_of_speakers_in_medium_resolution = 4
    number_of_speakers_in_large_resolution = 6

    placeholder_image_urls = [
        'images/speaker-placeholer-1-320x320.png',
        'images/speaker-placeholer-2-320x320.png',
        'images/speaker-placeholer-3-320x320.png',
    ]

    placeholders = []

    for i in range(get_number_of_placeholders(minimum_number_of_rows,
                                              number_of_speakers_in_large_resolution,
                                              number_of_speakers)):
        placeholders.append({
            'placeholder_background_image_url': placeholder_image_urls[i % len(placeholder_image_urls)],
            'show_for_large': True
        })

    for i in range(get_number_of_placeholders(minimum_number_of_rows,
                                              number_of_speakers_in_medium_resolution,
                                              number_of_speakers)):
        placeholders[i]['show_for_medium'] = True

    for i in range(get_number_of_placeholders(minimum_number_of_rows,
                                              number_of_speakers_in_small_resolution,
                                              number_of_speakers)):
        placeholders[i]['show_for_small'] = True

    return placeholders


def get_number_of_placeholders(minimum_number_of_rows, number_of_cells_in_row, number_of_actual_cells):
    number_of_rows = max(minimum_number_of_rows, int(ceil(number_of_actual_cells / number_of_cells_in_row)))
    return number_of_rows * number_of_cells_in_row - number_of_actual_cells


globals()['templateVariables'].update({
    'speakers': speakers,
    'speaker_placeholders': cell_placeholders(speakers),
    'sponsors': sponsors,
    'sponsor_placeholders': cell_placeholders(sponsors)
})

