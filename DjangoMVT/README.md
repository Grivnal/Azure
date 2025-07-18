## Python Django

```
py --version
py -m venv .venv
.venv\Scripts\activate.bat

python.exe -m pip install --upgrade pip
py -m pip install Django

py -m django --version

mkdir djangotutorial

django-admin startproject mysite djangotutorial

cd djangotutorial

py manage.py runserver 4892

ctrl+c

py manage.py startapp polls

py manage.py runserver 4892

pip install psycopg2-binary

py manage.py migrate

py manage.py makemigrations polls

py manage.py sqlmigrate polls 0001

deactivate
```

## Git Clone Project

```
git clone https://github.com/novakvova/DJANGO_PV311.git
cd DJANGO_PV311

py -m venv .venv
.venv\Scripts\activate.bat

python.exe -m pip install --upgrade pip
py -m pip install Django
pip install psycopg2-binary

cd djangotutorial

py manage.py runserver 4892

```

## Add env options
```
pip install python-decouple
```

##Add file .env to folder manage.py file
```
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=npg_mAo9XHf1PrWn
DB_HOST=ep-lingering-recipe-a2i5ma74-pooler.eu-central-1.aws.neon.tech
DB_PORT=5432
```

## Робота із зображеннями
```
.venv\Scripts\activate.bat
cd 1.SimpleSite
cd djangotutorial
py manage.py runserver 4892

pip install Pillow

py manage.py makemigrations polls
py manage.py migrate

```

## Отримання списку пакетів
```
.venv\Scripts\activate.bat
pip freeze
pip freeze > requirements.txt


git clone https://github.com/novakvova/DJANGO_PV311.git
cd DJANGO_PV311
cd DjangoMVT
py -m venv .venv
.venv\Scripts\activate.bat

python.exe -m pip install --upgrade pip
pip install -r requirements.txt

cd djangotutorial
copy .env.example .env
py manage.py runserver 4892
```

## Working images CustomUser
```
.venv\Scripts\activate.bat
cd djangotutorial

py manage.py makemigrations polls
py manage.py migrate

py manage.py runserver 4892
```