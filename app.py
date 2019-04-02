import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import psycopg2

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL', 'postgres://qihnxxmilzvhzg:160ea1c5f64de1ea71647b683eb664db8ed500036b34de8f21428c35ce18bfd3@ec2-75-101-131-79.compute-1.amazonaws.com:5432/d6vd7jki79ppau')
db = SQLAlchemy(app)
Base = automap_base()
Base.prepare(db.engine, reflect = True)
Fixtures = Base.classes.import

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/")
def names():
    start = "getting started"
    return print(start)
# need to map out our routes for our server side api


if __name__ == "__main__":
    app.run()