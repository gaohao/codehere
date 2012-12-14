from django.conf.urls import patterns, include, url
from codehere.views import index
from codehere.views import codepad
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	(r'codepad/$', codepad),
    ('^$', index),
)
