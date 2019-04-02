import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/china_trade.sqlite"
db = SQLAlchemy(app)
Base = automap_base()
Base.prepare(db.engine, reflect = True)
Imports = Base.classes.imports
Exports = Base.classes.export

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/commodity/{HSCODE}")
def names():
    stmt = db.session.query(Imports).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    sel = [
        Imports.Description,
        Imports.YTDValue,
        Imports.MoValue,
        Imports.Period,
        Imports.HSCODE
    ]
    results =  session.query(*sel).filter(Imports.HSC == HSCODE).all()
    hsc_data = {}
    for result in results:
        hsc_data["Description"] = result[4]

    return jsonify(hsc_data)
# need to map out our routes for our server side api


if __name__ == "__main__":
    app.run()