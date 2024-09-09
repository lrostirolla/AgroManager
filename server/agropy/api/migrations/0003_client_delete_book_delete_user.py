# Generated by Django 5.1.1 on 2024-09-08 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_book_author_user_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CPF', models.CharField(max_length=11, unique=True)),
                ('client_name', models.CharField(max_length=300)),
                ('farm_name', models.CharField(max_length=300)),
                ('city', models.CharField(max_length=300)),
                ('state', models.CharField(max_length=2)),
                ('total_area', models.FloatField()),
                ('useful_area', models.FloatField()),
                ('vegetation_area', models.FloatField()),
                ('crops', models.CharField(choices=[('1', 'Soja'), ('2', 'Milho'), ('3', 'Algodão'), ('4', 'Café'), ('5', 'Cana de Açucar')], max_length=10)),
            ],
        ),
        migrations.DeleteModel(
            name='Book',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
