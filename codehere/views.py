from django.template.loader import get_template
from django.template import Context, RequestContext
from django.http import HttpResponse
from django.shortcuts import render_to_response, render
from django.core.context_processors import csrf
import requests
from django.views.decorators.csrf import csrf_exempt


def index(request):
    if request.method == 'POST':
        pass
    else:
        t = get_template('index.html')
        html = t.render(Context({}))
        return HttpResponse(html)

@csrf_exempt
def codepad(request):

    code = request.POST.get('code', '')
    lang = request.POST.get('lang', '')
    data = {'code': code, 'lang': lang,
                     'private': 'False', 'run': 'True',
                     'submit': 'Submit'}
    r = requests.post("http://codepad.org/", data=data)
        
    if r.ok :

        content = requests.get(r.url)
        html = content.text
        ri = rj = 0
        i = 0
        i = html.find('<pre>', i)
        while i != -1:
            j = html.find('</pre>', i + 5)
            if j == -1:
                break
            ri = i
            rj = j
            i = html.find('<pre>', i + 5)
         
        re = html[ri : rj+6]

        return HttpResponse(re)
    else :
        return HttpResponse('something goes wrong:(')
    

    
    
    