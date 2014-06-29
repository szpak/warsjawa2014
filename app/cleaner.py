import os
import glob


def clean_path(path):
    ss = os.walk(path)
    print(ss)
    files = glob.glob(path + '/*')
    for file in files:
        print('deleting: ' + file)
        if os.path.isdir(file):
            os.removedirs(file)
        else:
            os.remove(file)
