

import datetime as dt
import numpy as np
import pandas as pd
import requests
import json
from pprint import pprint
import csv
# from api_key import api_key
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import os
import sqlalchemy
from flask import Flask, jsonify, render_template


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/china_trade.sqlite"
db = SQLAlchemy(app)
Base = automap_base()
Base.prepare(db.engine, reflect = True)
Imports = Base.classes.imports
Exports = Base.classes.export
barImports = Base.classes.imports
IndImports = Base.classes.hs2import
YRImports = Base.classes.yrhs2import
YRExports = Base.classes.yrhs2export
@app.route("/")
def index():
    return render_template("index.html")

# # @app.route("/import/hs2/<year>")
# # def imports():
    

# #     return jsonify(hsc_data)

# # @app.route("/export/hs2/<year>")
# # def imports():
    

# #     return jsonify(hsc_data)
# @app.route("/imports/tooltip/<hsc>/<year>")
# def imports_hsc(hsc, year):
#     sel = [
#         Imports.Description,
#         Imports.YTDValue,
#         Imports.Period,
#         Imports.HSC
#         ]
#     results = db.session.query(*sel).filter(Imports.HSC == hsc).filter(Imports.Period.like(f"%{year}%")).all()
  
#     hsc_data = {}
#     for result in results:
#         hsc_data["Description"] = result[0]
#         hsc_data["Annual Value"] = result[1]
#         hsc_data["Year"] = result[2]
#         hsc_data["HSC"] = result[3]

#     return jsonify(hsc_data)
# #4 digit HS code calls by year
# @app.route("/exports/tooltip/<HSC>/<year>")
# def exports_hsc(codes, year):
#     sel = [
#         Imports.Description,
#         Imports.YTDValue,
#         Imports.Period,
#         Imports.HSC
#         ]
#     results = db.session.query(*sel).filter(Export.HSC == codes).filter(Export.Period.like(f"%{year}%")).all()
  
#     hsc_data = {}
#     for result in results:
#         hsc_data["Description"] = result[0]
#         hsc_data["Annual Value"] = result[1]
#         hsc_data["Year"] = result[2]
#         hsc_data["HSC"] = result[3]

#     return jsonify(hsc_data)
# @app.route("/slices/<hsc>/<year>")   
# def slices(hsc, year):
#     sel = [
#         IndImports.Description,
#         IndImports.YTDValue,
#         IndImports.Period,
#         IndImports.HSC
#         ]

#     results = db.session.query(*sel).filter(IndImports.HSC == hsc).filter(IndImports.Period.like(f"%{year}%")).all()
#     hsc_ind_imports = {}
#     for result in results:
#         hsc_ind_imports["Description"] = result[0]
#         hsc_ind_imports["Annual Value"] = result[1]
#         hsc_ind_imports["Year"] = result[2]
#         hsc_ind_imports["HSC"] = result[3] 

#     return jsonify(hsc_ind_imports)

# @app.route("/imports/pie/<year>")
# def pies(year):

#     stmt = db.session.query(Imports).statement
#     df = pd.read_sql_query(stmt, db.session.bind)
#     df["MoValue"] =pd.to_numeric(df["MoValue"])
#     first_2015 = df[df["Period"].str.contains(f"{year}")]
#     data_2015 = first_2015.groupby(["HSC","Description"])["MoValue"].sum()
#     test= pd.DataFrame({"total" : data_2015})
#     data_2015= test.nlargest(10,"total")
#     data_2015 = data_2015.reset_index()

#     data_2015= data_2015.nlargest(10,"total")
#     data_2015= data_2015.to_dict("records")
#     return jsonify(data_2015)

# @app.route("/exports/pie/<year>")
# def expies(year):

#     stmt = db.session.query(Exports).statement
#     df = pd.read_sql_query(stmt, db.session.bind)
#     df["MoValue"] =pd.to_numeric(df["MoValue"])
#     first_2015 = df[df["Period"].str.contains(f"{year}")]
#     data_2015 = first_2015.groupby(["HSC","Description"])["MoValue"].sum()
#     test= pd.DataFrame({"total" : data_2015})
#     data_2015= test.nlargest(10,"total")
#     data_2015 = data_2015.reset_index()

#     data_2015= data_2015.nlargest(10,"total")
#     data_2015= data_2015.to_dict("records")
#     return jsonify(data_2015)    

# @app.route("/imports/tree/<year>")
# def trees(year):
#     stmt = db.session.query(Imports).statement
#     df = pd.read_sql_query(stmt, db.session.bind)
#     first_2015 = df[df["Period"].str.contains(f"{year}")]
#     data_2015 = first_2015.groupby(["Description", "HSC"])["MoValue"].sum()
#     test= pd.DataFrame({"total" : data_2015})
#     data_2015= test.nlargest(50,"total")
#     data_2015 = data_2015.reset_index()


#     data_2015= data_2015.nlargest(50,"total")
#     data_2015= data_2015.to_dict("records")
#     return jsonify(data_2015)

# # @app.route("/exports/tree/<year>")
# # def extrees(year):
# #     stmt = db.session.query(Export).statement
# #     df = pd.read_sql_query(stmt, db.session.bind)
# #     first_2015 = df[df["Period"].str.contains(f"{year}")]
# #     data_2015 = first_2015.groupby(["HSC","Description","Period"])["YTDValue"].sum()
# #     test= pd.DataFrame({"total" : data_2015})
# #     data_2015= test.nlargest(50,"total")
# #     data_2015 = data_2015.reset_index()

# @app.route("/imports/bars/<year>")
# def bars(year):
#     stmt = db.session.query(barImports).statement
#     df = pd.read_sql_query(stmt, db.session.bind)
#     df = df[df["Period"].str.contains(f"{year}")]
#     products = df.loc[df["HSC"] == 3915]
#     products= products.to_dict("records")

#     return jsonify(products)

@app.route("/imports/bars")
def bars():
    stmt = db.session.query(barImports).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    # df = df[df["Period"].str.contains(f"{year}")]
    data = df.groupby(["Period"])["MoValue"].sum()
    data = pd.DataFrame({"total" : data,"type":"import"})
    data = data.reset_index()
    data = data.to_dict("records")

    stmt2 = db.session.query(Exports).statement
    df2 = pd.read_sql_query(stmt2, db.session.bind)
    data2 = df2.groupby(["Period"])["MoValue"].sum()
    data2 = pd.DataFrame({"total" : data2,"type": "export"})
    data2 = data2.reset_index()
    data2 = data2.to_dict("records")
    bothData = (data+data2)

    return jsonify(bothData)
if __name__ == "__main__":
    app.run()

