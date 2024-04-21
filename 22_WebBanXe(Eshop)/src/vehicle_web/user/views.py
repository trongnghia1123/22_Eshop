from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login 
from .forms import LoginForm, RegistrationForm
from django.http import HttpResponseRedirect

# Create your views here.
def home(request):
    return render(request, 'user/home.html')

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
    else:
        form = LoginForm()
    return render(request, 'user/login.html', {
        'form': form
    })
    
def register_view(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = RegistrationForm()
    return render(request, 'user/registration.html', {
        'form': form
    })