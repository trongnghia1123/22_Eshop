from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.forms import inlineformset_factory
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from django.contrib.auth import authenticate, login, logout
from .forms import CreateUserForm

@csrf_exempt
def registerPage(request):
    form = CreateUserForm()
    
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Đăng ký thành công')
            return redirect('login')
    
    context = {'form': form}
    return render(request, 'user/register.html', context)

@csrf_exempt
def loginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.info(request, "Username or password is incorrect")
    context = {}
    return render(request, 'user/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('login')