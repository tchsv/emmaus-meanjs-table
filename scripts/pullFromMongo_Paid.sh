#!/usr/bin/env bash
mongoexport  --db=emmaus --collection=wholeteamlists  --type=csv  -f "Name,Committee,PaidAmount,Paid" > walk445_Paid.csv

