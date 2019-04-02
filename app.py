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

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../data/china_trade.sqlite"
db = SQLAlchemy(app)
Base = automap_base()
Base.prepare(db.engine, reflect = True)
Imports = Base.classes.imports
Exports = Base.classes.export

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