from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password
from .forms import RegisterForm, AddAccountForm, EditAccountForm
from django.contrib.auth import logout
from .utils import generate_password, password_verification
from .models import Account
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404





def home(request):
    return render(request, 'home.html')


def sign_up(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password1')

            hashed_password = make_password(password)

            user = User.objects.create(first_name=first_name, last_name=last_name, username=username, email=email, password=hashed_password)
            user.save()
            return redirect('login')  
    else:
        form = RegisterForm()
    return render(request, 'registration/sign_up.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('home')



@login_required
def dashboard(request):
    form = AddAccountForm()
    if request.method == 'POST':
        form = AddAccountForm(request.POST)
        if form.is_valid():
            new_account = form.save()
            new_account.user = request.user  
            new_account.save()
            return redirect('dashboard')
    else:
        form = AddAccountForm()
        editaccountform = EditAccountForm()

    accounts = Account.objects.filter(user=request.user)
    return render(request, 'dashboard.html', {'form': form, 'accounts': accounts, ' ten': editaccountform})



def edit_accountinfo(request, account_id):
    accountinfo = get_object_or_404(Account, id=account_id)

    if request.method == 'POST':
        form = EditAccountForm(request.POST, instance=accountinfo)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
    else:
        form = EditAccountForm(instance=accountinfo)

    return render(request, 'edit_accountinfo.html', {'form': form})


def delete_accountinfo(request, account_id):
    accountinfo = Account.objects.get(id=account_id)
    accountinfo.delete()
    return redirect('dashboard')

# ENCRTYPTION DECRYPTION



def passgen(request):
    password = ''
    score = 0
    feedback = []
    if request.method == 'POST':
        length = int(request.POST.get('length', 8))  
        letters = 'Letters' in request.POST
        digits = 'Digits' in request.POST
        specialChars = 'SpecialChars' in request.POST
        password = generate_password(length, letters, digits, specialChars)
    try:
        verificator = password_verification(password)
        score = verificator.get('score', 0)
        feedback = verificator.get('feedback', [])

    except IndexError:
        verificator = "Error analyzing password"
    return render(request, 'passgen.html', {'password': password, 'verificator': verificator, 'score': score, 'feedback': feedback})




def secury_check(request):
    password = ''
    score = 0
    feedback = []
    if request.method == 'POST':
        password = request.POST.get('password')
    try:
        verificator = password_verification(password)
        score = verificator.get('score', 0)
        feedback = verificator.get('feedback', [])
    except IndexError:
        verificator = "Error analyzing password"

    return render(request, 'secury_check.html', {'password': password, 'verificator': verificator, 'score': score, 'feedback': feedback})