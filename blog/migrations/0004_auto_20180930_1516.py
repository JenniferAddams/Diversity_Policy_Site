# Generated by Django 2.1.1 on 2018-09-30 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20180930_1514'),
    ]

    operations = [
        migrations.AlterField(
            model_name='policy',
            name='administrator',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='policy',
            name='department',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='policy',
            name='school',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='policy',
            name='text',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='policy',
            name='title',
            field=models.TextField(blank=True),
        ),
    ]