# AgroManager
Tiny web application developed to handle management of farmer client information.

Configuration stuff...

```bash
cd server/agropy 

conda create -n agro python=3.12
conda activate agro 
pip install -r requirements.txt

#set env variables.

export DB_NAME='agro_teste'
export DB_USER='postgres'
export DB_PASSWORD='123456'

python manage.py runserver 

```
