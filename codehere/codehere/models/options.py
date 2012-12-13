#encoding: utf-8

import argparse
file_types = {'c': 'C',
              'cpp': 'C++',
              'd': 'D',
              'hs': 'Haskell',
              'lua': 'Lua',
              'ml': 'OCaml',
              'php': 'PHP',
              'pl': 'Perl',
              'txt': 'Plain Text',
              'py': 'Python',
              'rb': 'Ruby',
              'scm': 'Scheme',
              'tcl': 'Tcl'}


parser = argparse.ArgumentParser()
parser.add_argument('-l', dest='lang', help="Set the language", choices=file_types.keys())
parser.add_argument('-p', dest='private', action='store_true', help="Should the code be private")
parser.add_argument('-r', dest='run', action='store_true', help="Should the code be run")
parser.add_argument('code', nargs='?', help="The file to be uploaded")



