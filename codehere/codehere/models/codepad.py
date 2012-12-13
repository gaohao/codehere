#encoding: utf-8

import requests

class CodePad(object):
    def __init__(self, code=None, lang="C", private=False, run=False):
        self.code = code
        self.lang = lang
        self.private = "True" if private else "False"
        self.run = "True" if run else "False"
        self.data = {'code': self.code, 'lang': self.lang,
                     'private': self.private, 'run': self.run,
                     'submit': 'Submit'}
        print self.data

    def save(self):
        r = requests.post("http://codepad.org/", data=self.data)
        
        print r.status_code
        print r.headers
        if r.ok :
            return r.url
        return None


