
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

export_url = (f"https://api.census.gov/data/timeseries/intltrade/exports")
import_url = (f"https://api.census.gov/data/timeseries/intltrade/imports")
china_code = "5700"
usa_code = "1000"
month = []
year = []

export_by_commodity = requests.get(f"{export_url}/hs?get=E_COMMODITY,E_COMMODITY_SDESC,ALL_VAL_MO,ALL_VAL_YR&time=from+2015-01&COMM_LVL=HS2&CTY_CODE={china_code}").json()

count = 1
movalue = []
yrvalue = []
period = []
desc = []
code = []
while count < 4745:
    count += 1
    movalue.append(export_by_commodity[count][2])
    yrvalue.append(export_by_commodity[count][3])
    desc.append(export_by_commodity[count][1])
    period.append(export_by_commodity[count][4])
    code.append(export_by_commodity[count][0])
china_data_export = pd.DataFrame({"YTD Value" : yrvalue,
                           "Monthly Value " : movalue,
                          "Period" : period,
                          "Commodity" : desc,
                          "Comm Code": code})

import_by_commodity = requests.get(f"{import_url}/hs?get=I_COMMODITY,I_COMMODITY_SDESC,GEN_VAL_MO,GEN_VAL_YR&time=from+2015-01&COMM_LVL=HS2&CTY_CODE={china_code}").json()

count = 1
movalue = []
yrvalue = []
period = []
desc = []
code = []
while count < 4802:
    count += 1
    movalue.append(import_by_commodity[count][2])
    yrvalue.append(import_by_commodity[count][3])
    desc.append(import_by_commodity[count][1])
    period.append(import_by_commodity[count][4])
    code.append(import_by_commodity[count][0])
china_data_import = pd.DataFrame({"YTD Value" : yrvalue,
                           "Monthly Value " : movalue,
                          "Period" : period,
                          "Commodity" : desc,
                          "Comm Code": code})

china_data_export["YTD Value"] =pd.to_numeric(china_data_export["YTD Value"])

first_2015 = china_data_export[china_data_export["Period"].str.contains("2015")]

data_2015 = first_2015.groupby(["Comm Code","Commodity"])["YTD Value"].sum()
test= pd.DataFrame({"total" : data_2015})
data_2015= test.nlargest(10,"total")
data_2015 = data_2015.reset_index()

data_2015= data_2015.nlargest(10,"total")




