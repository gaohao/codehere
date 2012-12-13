#encoding: utf-8


from codepad import CodePad
from options import parser, file_types
import sys
import os


class Cli(object):
  DEFAULT_TYPE = file_types['txt']
  STDIN = '-'

  def __init__(self):
    opts = parser.parse_args()

    paste_type = opts.lang or (opts.code and opts.code.split('.')[-1])
    self.lang = file_types.get(paste_type, self.DEFAULT_TYPE)

    self.code = opts.code
    if opts.code is self.STDIN: #If we discover that we will need stdin, change it.
      self.code = sys.stdin
    else:
      # Check if the file exists
      if self.code and not os.path.exists(str(self.code)):
        raise Exception("{0} does not exist".format(self.code))

    self.runit = opts.run
    self.private = opts.private

  def run(self):
    codepad = CodePad(code=open(self.code).read(), 
              lang=self.lang,
              private=self.private,
              run=self.runit)
    return codepad.save()

