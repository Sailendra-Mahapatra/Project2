import os

import numpy as np
import pandas as pd
import sqlalchemy
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/china_trade.sqlite"
db = SQLAlchemy(app)
Base = automap_base()
Base.prepare(db.engine, reflect = True)
Imports = Base.classes.imports
Exports = Base.classes.export
IndImports = Base.classes.hs2import
YRImports = Base.classes.yrhs2import
@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/import/hs2/<year>")
# def imports():
    

#     return jsonify(hsc_data)

# @app.route("/export/hs2/<year>")
# def imports():
    

#     return jsonify(hsc_data)
@app.route("/imports/tooltip/<hsc>/<year>")
def imports_hsc(hsc, year):
    sel = [
        Imports.Description,
        Imports.YTDValue,
        Imports.Period,
        Imports.HSC
        ]
    results = db.session.query(*sel).filter(Imports.HSC == hsc).filter(Imports.Period.like(f"%{year}%")).all()
  
    hsc_data = {}
    for result in results:
        hsc_data["Description"] = result[0]
        hsc_data["Annual Value"] = result[1]
        hsc_data["Year"] = result[2]
        hsc_data["HSC"] = result[3]

    return jsonify(hsc_data)

@app.route("/exports/tooltip/<HSC>/<year>")
def exports_hsc(codes, year):
    sel = [
        Imports.Description,
        Imports.YTDValue,
        Imports.Period,
        Imports.HSC
        ]
    results = db.session.query(*sel).filter(Export.HSC == codes).filter(Export.Period.like(f"%{year}%")).all()
  
    hsc_data = {}
    for result in results:
        hsc_data["Description"] = result[0]
        hsc_data["Annual Value"] = result[1]
        hsc_data["Year"] = result[2]
        hsc_data["HSC"] = result[3]

    return jsonify(hsc_data)
@app.route("/slices/<hsc>/<year>")   
def slices(hsc, year):
    sel = [
        IndImports.Description,
        IndImports.YTDValue,
        IndImports.Period,
        IndImports.HSC
        ]

    results = db.session.query(*sel).filter(IndImports.HSC == hsc).filter(IndImports.Period.like(f"%{year}%")).all()
    hsc_ind_imports = {}
    for result in results:
        hsc_ind_imports["Description"] = result[0]
        hsc_ind_imports["Annual Value"] = result[1]
        hsc_ind_imports["Year"] = result[2]
        hsc_ind_imports["HSC"] = result[3] 

    return jsonify(hsc_ind_imports)
@app.route("/pie/<year>")
def pies(year):

    stmt = db.session.query(YRImports).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    df["YTDValue"] =pd.to_numeric(df["YTDValue"])
    first_2015 = df[df["Period"].str.contains(f"{year}")]
    data_2015 = first_2015.groupby(["HSC","Description","Period"])["YTDValue"].sum()
    test= pd.DataFrame({"total" : data_2015})
    data_2015= test.nlargest(10,"total")
    data_2015 = data_2015.reset_index()

    data_2015= data_2015.nlargest(10,"total")
    data_2015= data_2015.to_dict("records")
    return jsonify(data_2015)#need to fix the dict
if __name__ == "__main__":
    app.run()
