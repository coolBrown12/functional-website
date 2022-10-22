
from django.shortcuts import render,redirect,HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User,auth



# Create your views here.
def home(request):
    return render(request,'index1.html')

def login(request):
    if request.method=='POST':
        username=request.POST['username']
        password=request.POST['password']
        print(username)
        user=auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect('yash.html')
        else:
            return redirect('yash')


def register(request):
    if request.method=="POST":
        username=request.POST['username']
        email=request.POST['email']
        pass1=request.POST['pass1']
        pass2=request.POST['pass2']
        print(username)
        print(pass1)

        if pass1==pass2:
            if User.objects.filter(username=username).exists():
                messages.error(request,'the already username')
            if User.objects.filter(email=email).exists():
                messages.error(request,'the email is already exist')
            else:
                user=User.objects.create(username=username,email=email,password=pass1)
                user.save()
                if user is not None:
                    auth.login(request,user)
                    return redirect('yash')
        else:
            messages.error(request,'password are not matching')

    else:
        return render(request,'index1.html')

def yash(request):
    return render(request,'yash.html')

def index2(request):
    return render(request,'index2.html')


