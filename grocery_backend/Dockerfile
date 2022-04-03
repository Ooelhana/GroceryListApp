FROM python:3.9.12

WORKDIR /app/api

COPY ./requirements.txt ./
RUN pip install -r requirements.txt

COPY . ./
EXPOSE 8000
