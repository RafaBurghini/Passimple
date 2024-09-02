from typing import Any
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, Account
from .utils import generate_password
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field

# Form for registering a new user
class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=100, required=True)
    last_name = forms.CharField(max_length=100, required=True)
    username = forms.CharField(max_length=100, required=True)
    password1 = forms.CharField(max_length=100, required=True, label='Password', widget=forms.TextInput(attrs={'readonly':'readonly'}))

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password1']

    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        self.generated_password = generate_password(length=20)
        self.fields['password1'].widget.attrs['readonly'] = True
        self.fields['password1'].initial = self.generated_password
        del self.fields['password2']

        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('first_name', css_class='sign_up-form'),
            Field('last_name', css_class='sign_up-form'),
            Field('username', css_class='sign_up-form'),
            Field('email', css_class='sign_up-form'),
            Field('password1', css_class='sign_up-form'),
        )

    
    
    def clean_password2(self):
        return self.generated_password

    def save(self, commit=True):
        self.cleaned_data['password1'] = self.generated_password
        password = self.cleaned_data['password1']
        user = super().save(commit=commit)
        return user, password
    


class AddAccountForm(forms.Form):
    site = forms.CharField(max_length=100, required=True)
    username = forms.CharField(max_length=100, required=True)
    email = forms.EmailField(required=True)
    password = forms.CharField(max_length=100, required=True)

    def __init__(self, *args, **kwargs):
        super(AddAccountForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('Site', css_class='add-account-form'),
            Field('User', css_class='add-account-form'),
            Field('Email', css_class='add-account-form'),
            Field('Password', css_class='add-account-form'),
        )

    def save(self):
        account = Account(site=self.cleaned_data['site'], username=self.cleaned_data['username'], email=self.cleaned_data['email'], password=self.cleaned_data['password'])
        account.save()
        return account


class EditAccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['site', 'username', 'email', 'password']

    def __init__(self, *args, **kwargs):
        super(EditAccountForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('site', css_class='edit-account-form'),
            Field('username', css_class='edit-account-form'),
            Field('email', css_class='edit-account-form'),
            Field('password', css_class='edit-account-form'),
        )

    def save(self, commit=True):
        account = super().save(commit=commit)
        return account
    